/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: decorators/consumers.ts
//|| Handles Reflect Metadata for Queue Consumers
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Decorator
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default function Consumer(instance: string, channel : string, queue : string, priority : number) {
            return function (target: any) {
                  Reflect.defineProperty(target, '__instanceName', {
                        value: instance,
                        writable: false,
                        enumerable: false
                  });
                  Reflect.defineProperty(target, '__consumerChannel', {
                        value: channel,
                        writable: false,
                        enumerable: false
                  });
                  Reflect.defineProperty(target, '__consumerQueue', {
                        value: queue,
                        writable: false,
                        enumerable: false
                  });
                  Reflect.defineProperty(target, '__consumerPriority', {
                        value: priority,
                        writable: false,
                        enumerable: false
                  });
            };
      }