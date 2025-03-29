/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: tests/release-cli.test.ts
//|| Tests for release.mjs - Validates CLI execution with patch/minor/major argument support
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as child from 'child_process';
import * as process from 'process';
import { release } from '../scripts/release.ts';

vi.mock('child_process');
vi.mock('process');

describe('Release CLI', () => {
   beforeEach(() => {
      vi.resetAllMocks();
   });

   it('should execute release with "patch" when no argument is provided', async () => {
      const logSpy = vi.fn();
      process.argv = ['node', 'release.mjs']; // Simulating no argument provided
      vi.spyOn(global.console, 'log').mockImplementation(logSpy);

      await import('../scripts/release.mjs'); // Simulate running the script

      expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 1.2.4'); // Example log output after patch bump
   });

   it('should execute release with "minor" when "minor" argument is provided', async () => {
      const logSpy = vi.fn();
      process.argv = ['node', 'release.mjs', 'minor']; // Simulating minor argument
      vi.spyOn(global.console, 'log').mockImplementation(logSpy);

      await import('../scripts/release.mjs'); // Simulate running the script

      expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 1.3.0'); // Example log output after minor bump
   });

   it('should execute release with "major" when "major" argument is provided', async () => {
      const logSpy = vi.fn();
      process.argv = ['node', 'release.mjs', 'major']; // Simulating major argument
      vi.spyOn(global.console, 'log').mockImplementation(logSpy);

      await import('../scripts/release.mjs'); // Simulate running the script

      expect(logSpy).toHaveBeenCalledWith('[release] Version bumped: 1.2.3 → 2.0.0'); // Example log output after major bump
   });

   it('should handle errors correctly and log them', async () => {
      const logSpy = vi.fn();
      process.argv = ['node', 'release.mjs', 'patch']; // Simulating patch argument
      vi.spyOn(global.console, 'error').mockImplementation(logSpy);

      // Mocking the release function to throw an error
      vi.spyOn(release, 'release').mockImplementationOnce(() => { throw new Error('Test error'); });

      await import('../scripts/release.mjs'); // Simulate running the script

      expect(logSpy).toHaveBeenCalledWith('[release error]', 'Test error');
   });
});
