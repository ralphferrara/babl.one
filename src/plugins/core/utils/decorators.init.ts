/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Test if Decorators are Working
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

export function decoratorsInit(): boolean {
      function DecoratorTest(val : string ): ClassDecorator {
            return function (target: any) {
                  Reflect.defineProperty(target, '__decoratorTest', {
                        value: val,
                        writable: false,
                        enumerable: false
                  });
            };
      }

      @DecoratorTest('test')
      class DecoratorCheck {}

      return Reflect.get(DecoratorCheck, '__decoratorTest') === 'test';
}