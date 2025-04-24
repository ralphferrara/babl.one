/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| @babl.one/core :: decorators/plugin.ts
//|| Handles Reflect Metadata for Plugins
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default function Plugin(name: string, configFile?: string) {
            return function (target: any) {
                  Reflect.defineProperty(target, '__pluginName', {
                        value: name,
                        writable: false,
                        enumerable: false
                  });
                  Reflect.defineProperty(target, '__pluginConfigFile', {
                        value: configFile,
                        writable: false,
                        enumerable: false
                  });
            };
      }