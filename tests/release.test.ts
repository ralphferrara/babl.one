/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: tests/config.test.ts
//|| Config Plugin Test - Validates config loading and registration behavior
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Imports
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { describe, it, expect, vi, beforeEach } from 'vitest';
      import fs                                       from 'node:fs';
      import path                                     from 'node:path';
      import ConfigPlugin                             from '~/plugins/config';
      import { App }                                  from '~/app';


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Mocks
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      vi.mock('node:fs');


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Suite
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      describe('ConfigPlugin', () => {

            let app: App;

            beforeEach(() => {
                  vi.resetAllMocks();
                  app = new App();
            });

            it('should load and register config values from JSON files', () => {
                  const fakeFiles = ['core.json', 'logger.json'];

                  vi.spyOn(fs, 'existsSync').mockReturnValue(true);
                  vi.spyOn(fs, 'readdirSync').mockReturnValue(fakeFiles);
                  vi.spyOn(fs, 'readFileSync').mockImplementation((file: string) => {
                        if (file.endsWith('core.json')) return '{"env":"dev"}';
                        if (file.endsWith('logger.json')) return '{"color":"blue"}';
                        return '';
                  });

                  ConfigPlugin(app);

                  const config = app.resolve<any>('config');
                  expect(config).toBeDefined();
                  expect(config.core.env).toBe('dev');
                  expect(config.logger.color).toBe('blue');
            });

      });
