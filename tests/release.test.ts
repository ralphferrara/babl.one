/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: release.test.ts
//|| Unit Tests for Release Helpers - Validates version bumping, package reading/writing, and shell execution
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { describe, it, expect, vi, beforeEach }    from 'vitest';
      import * as fs                                     from 'fs';
      import * as child                                  from 'child_process';

      import {
            bumpVersion,
            readPackage,
            writePackage,
            runCommand
      }                                                  from '../scripts/release.ts';

      vi.mock('fs');
      vi.mock('child_process');


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Test Suite: release helpers
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      describe('release helpers', () => {

            beforeEach(() => {
                  vi.resetAllMocks();
            });

            it('should bump patch version', () => {
                  expect(bumpVersion('1.2.3', 'patch')).toBe('1.2.4');
            });

            it('should bump minor version', () => {
                  expect(bumpVersion('1.2.3', 'minor')).toBe('1.3.0');
            });

            it('should bump major version', () => {
                  expect(bumpVersion('1.2.3', 'major')).toBe('2.0.0');
            });

            it('should read package.json', () => {
                  vi.spyOn(fs, 'readFileSync').mockReturnValue('{"version":"1.0.0"}');
                  const result                     = readPackage();
                  expect(result.version).toBe('1.0.0');
            });

            it('should write package.json correctly', () => {
                  const spy                        = vi.spyOn(fs, 'writeFileSync');
                  const mockPkg                    = { version: '2.3.4' };
                  writePackage(mockPkg);
                  expect(spy).toHaveBeenCalledWith(
                        'package.json',
                        JSON.stringify(mockPkg, null, 3)
                  );
            });

            it('should execute shell command', () => {
                  const spy                        = vi.spyOn(child, 'execSync');
                  runCommand('echo Hello');
                  expect(spy).toHaveBeenCalledWith('echo Hello', { stdio: 'inherit' });
            });

      });