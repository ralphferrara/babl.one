import { describe, it, beforeEach, afterAll, expect, vi }   from 'vitest';
import FileWatcher, { FileWatcherObject }                   from '../../plugins/core/classes/file.watcher';
import fs from 'fs/promises';
import path from 'path';
import chokidar from 'chokidar';

      // Mocks
      vi.mock('fs/promises');
      vi.mock('chokidar');

      const mockFs = fs as jest.Mocked<typeof fs>;
      const mockChokidar = chokidar as jest.Mocked<typeof chokidar>;

      const sampleFiles = ['file1.txt', 'file2.js', 'subdir'];
      const sampleSubdirFiles = ['nested.txt'];

      mockFs.readdir.mockImplementation(async (dirPath: string) => {
            return dirPath.endsWith('subdir') ? sampleSubdirFiles : sampleFiles;
      });

      mockFs.stat.mockImplementation(async (filePath: string) => ({
            isFile: () => !filePath.endsWith('subdir'),
            isDirectory: () => filePath.endsWith('subdir'),
      } as any));

      mockFs.readFile.mockImplementation(async (filePath: string) => Buffer.from(`content of ${filePath}`));

      const mockWatcherInstance = {
            on: vi.fn().mockReturnThis(),
            close: vi.fn(),
      };

      mockChokidar.watch.mockImplementation(() => mockWatcherInstance as any);

      describe('FileWatcher', () => {

            let fileWatcher: FileWatcher;

            beforeEach(async () => {
                  fileWatcher = new FileWatcher('/root');
                  fileWatcher.recursive = true;
                  fileWatcher.watch = true;
                  fileWatcher.extMatch = '.txt';
                  await fileWatcher.init();
            });

            afterAll(async () => {
                  await fileWatcher.close();
            });

            it('should correctly initialize and scan directories recursively', () => {
                  expect(mockFs.readdir).toHaveBeenCalledWith(expect.stringContaining('/root'));
                  expect(mockFs.readdir).toHaveBeenCalledWith(expect.stringContaining('/root/subdir'));
                  expect(mockFs.readFile).toHaveBeenCalledWith(expect.stringContaining('file1.txt'));
                  expect(mockFs.readFile).toHaveBeenCalledWith(expect.stringContaining('nested.txt'));
                  expect(mockFs.readFile).not.toHaveBeenCalledWith(expect.stringContaining('file2.js'));

                  expect(fileWatcher['list'].length).toBe(2);
                  expect(fileWatcher['list'].map(f => path.basename(f.absolute))).toEqual(expect.arrayContaining(['file1.txt', 'nested.txt']));
            });

            it('should attach watchers correctly', async () => {
                  // re-init after clearing to test from fresh state
                  mockChokidar.watch.mockClear();
                  fileWatcher = new FileWatcher('/root');
                  fileWatcher.recursive = true;
                  fileWatcher.watch = true;
                  fileWatcher.extMatch = '.txt';
                  await fileWatcher.init();

                  expect(mockChokidar.watch).toHaveBeenCalledTimes(2);
                  expect(mockChokidar.watch).toHaveBeenCalledWith(expect.stringContaining('file1.txt'), { persistent: true });
                  expect(mockChokidar.watch).toHaveBeenCalledWith(expect.stringContaining('nested.txt'), { persistent: true });
            });

            it('should handle file changes and reload structure', async () => {
                  mockFs.readFile.mockClear();
                  mockFs.readdir.mockClear();

                  await fileWatcher['handleFileChange']();

                  expect(mockWatcherInstance.close).toHaveBeenCalledTimes(2);
                  expect(mockFs.readdir).toHaveBeenCalled();
                  expect(mockFs.readFile).toHaveBeenCalled();
            });

            it('should correctly invoke callback after scanning', async () => {
                  const callbackMock = vi.fn();
                  fileWatcher.callback = callbackMock;

                  await fileWatcher.handleCallback();

                  expect(callbackMock).toHaveBeenCalledWith(expect.arrayContaining<FileWatcherObject>([
                        expect.objectContaining({ relative: expect.stringContaining('file1.txt') }),
                        expect.objectContaining({ relative: expect.stringContaining('nested.txt') })
                  ]));
            });
      });
