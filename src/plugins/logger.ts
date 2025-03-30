/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one Plugin :: Logger
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

export default class Logger {

      static async init(app: any) {
            app.logs = (msg: string, type: string = 'log') => {
                  const timestamp = new Date().toISOString();
                  const label = `[${type.toUpperCase()}]`.padEnd(8);
                  console.log(`${label} ${timestamp} :: ${msg}`);
            };

            app.logs('Logger plugin loaded', 'head');
      }
}