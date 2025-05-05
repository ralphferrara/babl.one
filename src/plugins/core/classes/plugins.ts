/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| @babl.one/core :: Plugins
//|| CORE :: Plugin Class
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import path                   from 'path';
      import { pathToFileURL }     from 'url';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Classes
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app              from '../app'; 
      import FileWatcher      from './file.watcher';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Section
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      const SECTION_PLUGINS = 'plugins';
      
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Config
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      class Plugins {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Set 
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public set(name : string, func : () => void): void {
                  app.log("app.plugins() : Function set for deferral : " + name, 'info');
                  if (app.global(SECTION_PLUGINS, name)) app.log("app.plugins() : Plugin found : " + name, 'warn');
                  app.global.set(SECTION_PLUGINS, name, func)
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public init(): void {
                  app.log('app.plugins.init() : Defer Initialized', 'success');
                  app.global.init(SECTION_PLUGINS);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Run all deferred calls
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async search(dir : string, extension : string): Promise<void> {
                  const resolvedDir = path.resolve(process.cwd(), dir);
                  const exists      = await app.path(resolvedDir).exists()
                  app.log(`Plugins search : ${app.path(dir).abs()} - Exists : ${exists} `, 'info');
                  if (!exists) return app.log(`app.plugins.search() : Directory not found: ${resolvedDir}`, 'error');
                  const fw = new FileWatcher(app.path(resolvedDir).abs());
                  fw.recursive  = true;
                  fw.extMatch   = extension;
                  fw.watch      = false;
                  fw.callback   = async (files) => {
                        app.log(`app.plugins.search() : Filewatcher ${files.length} plugins`, 'info');
                        let pluginCount = 0;
                        for (const file of files) {
                              try {
                                    const pluginPath  = pathToFileURL(file.absolute).href;
                                    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                                    //|| Ignore Core & Client 
                                    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                                    if (pluginPath.indexOf('@babl.one/core/') > -1) continue;
                                    if (pluginPath.indexOf('@babl.one/client') > -1) continue;
                                    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                                    //|| Ignore Core
                                    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                                    app.log("Plugin found : " + pluginPath, 'info');
                                    const pluginClass = await this.loadPlugin(file.absolute, '');
                                    if (!pluginClass) {
                                          app.log(`Plugin load failed: No default export in ${pluginPath}`, 'warn');
                                    }                                    
                                    const pluginName = pluginClass ? Reflect.get(pluginClass, '__pluginName') : undefined;
                                    app.log("Plugin imported : " + pluginPath, 'info');
                                    if (pluginName) {
                                          app.plugins.set(pluginName, pluginClass);
                                          pluginCount++;
                                    }
                              } catch (err) {
                                    console.log(`\n------------------------------------------------------------------`);
                                    console.log(`Plugin load failed: ${file.relative}`);
                                    console.log(err);
                                    console.log(`------------------------------------------------------------------\n`);
                              }
                        }
                        app.log(`Plugins located in ${dir}:  ${pluginCount}`, 'success');                                          
                  };
                  await fw.init();
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Load Plugin
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async loadPlugin(filePath: string) {
                  try {
                        // First attempt dynamic import
                        const pluginPath = pathToFileURL(filePath).href;
                        const pluginImport = await import(pluginPath);
                        return pluginImport?.default;
                  } catch (dynamicErr) {
                        try {
                              // Try guessing the module name only if dynamic import failed AND if it's NOT an ESM file
                              const relativePath = path.relative(path.resolve(process.cwd(), 'node_modules'), filePath);
                              const parts = relativePath.split(path.sep);
                              let moduleName = parts[0];
                              if (moduleName.startsWith('@')) {
                                    moduleName = parts.slice(0, 2).join('/');
                              }
            
                              const modulePackagePath = path.resolve(process.cwd(), 'node_modules', moduleName, 'package.json');
                              const modulePackage = await app.path(modulePackagePath).json();
            
                              if (modulePackage?.type === 'module') {
                                    app.log(`Skipping require() fallback for ESM-only module: ${moduleName}`, 'warn');
                                    return null;
                              }
            
                              const pluginRequire = require(moduleName);
                              return pluginRequire?.default;
                        } catch (requireErr) {
                              console.error(`Plugin load failed for file: ${filePath}`, requireErr);
                              return null;
                        }
                  }
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Use Plugin
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async use(name: string, ...args: any[]) {
                  app.log(`app.plugins.use() : Loading plugin: ${name}`, 'info');
                  const plugin = app.global(SECTION_PLUGINS, name);
                  if (plugin) {
                        try {
                              app.log(`Plugin Loading: ${name}`, 'head');
                              const configPath = plugin.__pluginConfigFile ?? '';
                              await plugin.init(configPath, ...args);
                              plugin.enabled = true;
                              app.log(`Plugin Loaded Successfully: ${name}`, 'success');
                        } catch (err) {
                              app.log(`Plugin Load Failed: ${name}`, 'error');
                              console.log(err);
                        }
                  } else {
                        app.log(`Plugin Not Found: ${name}. To install it, run:`, 'error');
                        app.log(`npm install @babl.one/${name}`, 'fail');
                  }
            }            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Export Default as a Getter and also an instance of the Config Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default Object.setPrototypeOf((name: string) => app.global(SECTION_PLUGINS, name), new Plugins());
