import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as child from 'child_process';
import {
   bumpPatch,
   readPackage,
   writePackage,
   runCommand
} from '../scripts/release';

vi.mock('fs');
vi.mock('child_process');

describe('release helpers', () => {
   beforeEach(() => {
      vi.resetAllMocks();
   });

   it('should bump patch version correctly', () => {
      expect(bumpPatch('0.0.1')).toBe('0.0.2');
      expect(bumpPatch('1.2.9')).toBe('1.2.10');
   });

   it('should read package.json', () => {
      vi.spyOn(fs, 'readFileSync').mockReturnValue('{"version":"1.0.0"}');
      const result = readPackage();
      expect(result.version).toBe('1.0.0');
   });

   it('should write package.json', () => {
      const writeSpy = vi.spyOn(fs, 'writeFileSync');
      writePackage({ version: '1.2.3' });
      expect(writeSpy).toHaveBeenCalledWith(
         'package.json',
         JSON.stringify({ version: '1.2.3' }, null, 3)
      );
   });

   it('should run shell command', () => {
      const execSpy = vi.spyOn(child, 'execSync');
      runCommand('echo "hi"');
      expect(execSpy).toHaveBeenCalledWith('echo "hi"', { stdio: 'inherit' });
   });
});
