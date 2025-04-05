// tests/path.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as fsConst from 'fs';
import Path from '~/path';

vi.mock('fs/promises');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Path Utility', () => {

      const filePath = 'test/data/example.txt';
      const absolutePath = path.resolve(__dirname, '../../', filePath);

      beforeEach(() => {
            vi.restoreAllMocks();
      });

      it('should return absolute path', () => {
            const p = Path(filePath);
            expect(p.abs()).toBe(absolutePath);
      });

      it('should return extension', () => {
            const p = Path(filePath);
            expect(p.ext()).toBe('txt');
      });

      it('should return base name without extension', () => {
            const p = Path(filePath);
            expect(p.base()).toBe('example');
      });

      it('should return full file name', () => {
            const p = Path(filePath);
            expect(p.name()).toBe('example.txt');
      });

      it('should return correct MIME type', () => {
            const p = Path(filePath);
            expect(p.header()).toBe('text/plain');
      });

      it('should detect file as file', () => {
            const p = Path(filePath);
            expect(p.isFile()).toBe(true);
            expect(p.isDirectory()).toBe(false);
      });

      it('should detect dot and dot-dot paths', () => {
            expect(Path('.').isDot()).toBe(true);
            expect(Path('..').isDotDot()).toBe(true);
      });

      it('should check file existence', async () => {
            vi.spyOn(fs, 'access').mockResolvedValueOnce(undefined);
            const p = Path(filePath);
            await expect(p.exists()).resolves.toBe(true);
      });

      it('should return false when file does not exist', async () => {
            vi.spyOn(fs, 'access').mockRejectedValueOnce(new Error('Not found'));
            const p = Path(filePath);
            await expect(p.exists()).resolves.toBe(false);
      });

      it('should read file as string', async () => {
            mockFs.readFile.mockResolvedValueOnce(Buffer.from('file content'));
            const p = Path(filePath);
            await expect(p.read()).resolves.toBe('file content');
      });

      it('should read file as buffer', async () => {
            const buffer = Buffer.from('binary content');
            mockFs.readFile.mockResolvedValueOnce(buffer);
            const p = Path(filePath);
            await expect(p.read(true)).resolves.toEqual(buffer);
      });

      it('should write file successfully', async () => {
            mockFs.writeFile.mockResolvedValueOnce(undefined as any);
            const p = Path(filePath);
            await expect(p.write('Hello')).resolves.toBe(true);
      });

      it('should return false if write fails', async () => {
            mockFs.writeFile.mockRejectedValueOnce(new Error('fail'));
            const p = Path(filePath);
            await expect(p.write('fail')).resolves.toBe(false);
      });

      it('should safely unlink existing file', async () => {
            mockFs.unlink.mockResolvedValueOnce(undefined as any);
            const p = Path(filePath);
            await expect(p.unlink()).resolves.toBe(true);
      });

      it('should return false if unlink fails', async () => {
            mockFs.unlink.mockRejectedValueOnce(new Error('not found'));
            const p = Path(filePath);
            await expect(p.unlink()).resolves.toBe(false);
      });

      it('should read and parse JSON file', async () => {
            mockFs.readFile.mockResolvedValueOnce(Buffer.from(JSON.stringify({ name: 'babl' })));
            const p = Path('data.json');
            await expect(p.json()).resolves.toEqual({ name: 'babl' });
      });

      it('should return default value on bad JSON', async () => {
            mockFs.readFile.mockRejectedValueOnce(new Error('fail'));
            const p = Path('data.json');
            await expect(p.json({ fallback: true })).resolves.toEqual({ fallback: true });
      });
});
