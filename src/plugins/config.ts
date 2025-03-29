/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: plugins/config.ts
//|| Config Plugin - Loads and watches /config/*.json files with environment-specific overrides from /config.{env}
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Imports
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import fs                        from 'node:fs';
      import path                      from 'node:path';
      import { App }                   from '~/app';


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Plugin Entry
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default function ConfigPlugin(app: App) {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Initial Load Config
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
            const env                  = process.env.NODE_ENV || 'development'; // Default to 'development' if not set
            const configDir            = path.resolve(process.cwd(), 'config');
            const envConfigDir         = path.resolve(process.cwd(), `config.${env}`); // Environment-specific folder
            const configCache: any     = {};

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Initial Load Config
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            loadAllConfigs();
            app.provide('config', configCache);

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Watch Live Reload
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            if ( !app.isProd() ) fs.watch(configDir, (event, filename) => {
                  if (!filename.endsWith('.json')) return;
                  const name            = path.basename(filename, '.json');
                  const fullPath        = path.join(configDir, filename);

                  try {
                        const raw     = fs.readFileSync(fullPath, 'utf8');
                        const parsed  = JSON.parse(raw);
                        configCache[name] = parsed;
                        app.emit('config.reload');

                        const logger = safeLogger(app);
                        logger?.log(`Reloaded config: ${filename}`, 'success');

                  } catch (err: any) {
                        const logger = safeLogger(app);
                        logger?.log(`Failed to reload config: ${filename}`, 'error');
                        logger?.log(err.message || err.toString(), 'debug');
                  }
            });


            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Load All Configs
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            function loadAllConfigs() {
                  if (!fs.existsSync(configDir)) return;
                  const files           = fs.readdirSync(configDir);

                  for (const file of files) {
                        if (!file.endsWith('.json')) continue;
                        const name      = path.basename(file, '.json');
                        const fullPath  = path.join(configDir, file);
                        try {
                              const raw        = fs.readFileSync(fullPath, 'utf8');
                              const parsed     = JSON.parse(raw);
                              configCache[name] = parsed;

                              // Now, try to load environment-specific override
                              const envSpecificPath = path.join(envConfigDir, `${name}.json`);
                              if (fs.existsSync(envSpecificPath)) {
                                    const envRaw = fs.readFileSync(envSpecificPath, 'utf8');
                                    const envParsed = JSON.parse(envRaw);
                                    configCache[name] = { ...configCache[name], ...envParsed };
                              }
                        } catch (err) {
                              const logger = safeLogger(app);
                              logger?.log(`Failed to load config: ${file}`, 'error');
                        }
                  }
            }


            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Safe Logger
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            function safeLogger(app: App): any {
                  try {
                        return app.resolve<any>('logger');
                  } catch {
                        return null;
                  }
            }

      }