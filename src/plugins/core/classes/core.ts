/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /classes/core.ts
//|| Main Class
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { Path }                             from './path';
      import { FileWatcher }                      from './file.watcher';
      import { writeFile, unlink, access }        from 'fs/promises';
      import { constants }                        from 'fs';
      import { pathToFileURL }                    from 'url';
      import path                                 from 'path';

      declare global {
            var __counter: number | undefined;
      }
      

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export class Core {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Internal Vars
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            private _plugins                       = new Map<string, any>();
            private _watchdogs                     = new Map<string, number>();
            private _defer                         = [] as Function[];
            private _init                          = false;
            private _exiting                       = false;

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Core
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            constructor() {
                  globalThis.__counter = (globalThis.__counter || 0) + 1;
                  this.log("NEW CORE CLASS CREATED! - " + globalThis.__counter, "head");
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Path Utility
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public path(path: string): any {
                  return Path(path);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Log
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public log(message: string, method: string = "log") {
                  console.log(`[${new Date().toLocaleString()}] ${message}`);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Plugin Registration
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public register(name: string, plugin: any) {
                  this._plugins.set(name, plugin);
            }

            public registerError(code: string, message: any) {
                  // Placeholder for error registration
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Watchdog Management
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public watchdog(name: string, func: Function, interval: number) {
                  this._watchdogs.set(name, setInterval(func, interval));
            }

            public clearWatchdog(name: string) {
                  const intervalId = this._watchdogs.get(name);
                  if (intervalId) {
                        clearInterval(intervalId);
                        this._watchdogs.delete(name);
                        this.log(`Watchdog ${name} cleared`, 'info');
                  } else {
                        this.log(`Watchdog ${name} not found`, 'warn');
                  }
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Routing / Auth / Health Placeholders
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public route(route: string, chirp: any) {
                  this.log(`Request for routing (Route : ${chirp.data('route')} ), but router is not configured`, 'error');
            }

            public health(field: string, value: any, threatLevel: "INFO" | "WATCH" | "WARN" | "EMERGENCY") {
                  this.log(`Health not configured. Attempting to set ${field} => ${value}`, 'warn');
            }

            public async authorize(chirp: any, level: number): Promise<boolean> {
                  const route = (typeof chirp.data === "function") ? chirp.data('route') : "UNKNOWN ROUTE";
                  this.log(`Request for authentication (Route : ${route} / Level : ${level} ), but auth is not configured`, 'error');
                  return false;
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Senders
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public send(name: string, seqi: any) {
                  this.log(`app.send :: @babl.one/sender is not been installed`, 'error');
                  return seqi;
            }

            public registerSender(name: string, sender: any) {
                  this.log(`app.registerSender : @babl.one/sender is not been installed`, 'error');
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Plugin Loaders
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async plugins(dir: string = './src/plugins') {
                  const resolvedDir = path.resolve(process.cwd(), dir);
                  const fw = new FileWatcher(resolvedDir);
                  fw.recursive  = true;
                  fw.extMatch   = 'ts';
                  fw.watch      = false;
                  fw.callback   = async (files) => {
                        let pluginCount = 0;
                        for (const file of files) {
                              try {
                                    const pluginPath  = pathToFileURL(file.absolute).href;
                                    const plugin      = await import(pluginPath);
                                    const pluginClass = plugin?.default;
                                    const pluginName  = pluginClass?.__pluginName;
                                    if (pluginName) {
                                          this.register(pluginName, pluginClass);
                                          pluginCount++;
                                          process.stdout.write(`\rPlugins located:  ${pluginCount}`);
                                    }
                              } catch (err) {
                                    console.log(`\n------------------------------------------------------------------`);
                                    console.log(`Plugin load failed: ${file.relative}`);
                                    console.log(err);
                                    console.log(`------------------------------------------------------------------\n`);
                              }
                        }
                        if (pluginCount > 0) process.stdout.write('\n');
                  };
                  await fw.init();
            }

            public async stock(dir: string = './node_modules/@babl.one') {
                  const resolvedDir = path.resolve(process.cwd(), dir);
                  const fw = new FileWatcher(resolvedDir);
                  fw.recursive = true;
                  fw.extMatch = 'js';
                  fw.watch = false;
                  fw.callback = async (files) => {
                        let pluginCount = 0;
                        for (const file of files) {
                              try {
                                    const pluginPath = pathToFileURL(file.absolute).href;
                                    const plugin = await import(pluginPath);
                                    const pluginClass = plugin?.default;
                                    const pluginName = pluginClass?.__pluginName;
                                    if (pluginName) {
                                          this.register(pluginName, pluginClass);
                                          pluginCount++;
                                          process.stdout.write(`\rPlugins located:  ${pluginCount}`);
                                    }
                              } catch (err) {
                                    console.log(`\n------------------------------------------------------------------`);
                                    console.log(`Plugin load failed: ${file.relative}`);
                                    console.log(err);
                                    console.log(`------------------------------------------------------------------\n`);
                              }
                        }
                        if (pluginCount > 0) process.stdout.write('\n');
                  };
                  await fw.init();
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Use Plugin
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async use(type: string, ...args: any[]) {
                  const plugin = this._plugins.get(type);
                  if (plugin) {
                        try {
                              this.log(`Plugin Loading: ${type}`, 'head');
                              const configPath = plugin.__pluginConfigFile ?? '';
                              await plugin.init(configPath, ...args);
                              plugin.enabled = true;
                              this.log(`Plugin Loaded Successfully: ${type}`, 'success');
                        } catch (err) {
                              this.log(`Plugin Load Failed: ${type}`, 'error');
                              console.log(err);
                        }
                  } else {
                        this.log(`Plugin Not Found: ${type}. To install it, run:`, 'error');
                        this.log(`npm install @babl.one/${type}`, 'fail');
                  }
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init / Exit / Defer
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public async init(callback: Function) {
                  this.log(`Application Starting...`, "head");
                  this.log(`Application PID: ${process.pid}`, "head");
                  this.log(`Application Node Version: ${process.versions.node}`, "head");
                  this.log(`Application Platform: ${process.platform}`, "head");
                  this.log(`Application Directory: ${process.cwd()}`, "head");
                  this.log(`Application Environment: ${process.env.NODE_ENV}`, "head");

                  if (process.listenerCount("SIGINT") === 0)
                        process.on("SIGINT",      async () => { await this.exit("SIGINT"); });
                  if (process.listenerCount("SIGTERM") === 0)
                        process.on("SIGTERM",     async () => { await this.exit("SIGTERM"); });
                  if (process.listenerCount("beforeExit") === 0)
                        process.on("beforeExit",  async () => { await this.exit("beforeExit"); });
                  if (process.listenerCount("exit") === 0)
                        process.on("exit",        async () => { await this.exit("exit"); });
                  if (process.listenerCount("uncaughtException") === 0)
                        process.on("uncaughtException", async (err) => {
                              this.log("Uncaught Exception", "error");
                              console.error(err);
                              await this.exit("uncaughtException");
                        });
                        
                  await this.stock();
                  await this.plugins();

                  if (typeof callback === "function") await callback();

                  this.log("Application Started", "complete");
                  this._init = true;
            }

            public async defer(callback: Function) {
                  if (typeof callback === "function") this._defer.push(callback);
            }

            public async exit(callback: any) {
                  if (this._exiting) return;
                  this._exiting = true;
                  this.log("Application Exiting...", "head");
                  for (const fn of this._defer) {
                        try {
                              await fn();
                        } catch (err) {
                              this.log("Deferred callback failed", 'error');
                              console.error(err);
                        }
                  }
                  if (typeof callback === 'function') await callback();
            }

      }
