/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one Plugin :: Console Pretty Logger
//|| Replaces app.log with colorized and structured console output using a Logger class
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class Log {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public static init() {
                  Log.log(["","Welcome to Babl.one",""],                            "head");
                  Log.log(`Application Starting...`,                                "info");
                  Log.log(`Application PID: ${process.pid}`,                        "info");
                  Log.log(`Application Node Version: ${process.versions.node}`,     "info");
                  Log.log(`Application Platform: ${process.platform}`,              "info");
                  Log.log(`Application Directory: ${process.cwd()}`,                "info");
                  Log.log(`Application Environment: ${process.env.NODE_ENV}`,       "info");                  
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Color Map
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            private static colors = { reset:"\x1b[0m", blink:"\x1b[5m", fgBlack:"\x1b[30m", fgRed:"\x1b[31m", fgGreen:"\x1b[32m", fgGray:"\x1b[90m", fgYellow:"\x1b[33m", fgBlue:"\x1b[34m", fgMagenta:"\x1b[35m", fgCyan:"\x1b[36m", fgWhite:"\x1b[37m", bgBlack:"\x1b[40m", bgRed:"\x1b[41m", bgYellow:"\x1b[43m", bgBlue:"\x1b[44m", bgMagenta:"\x1b[45m", bgCyan:"\x1b[46m", bgWhite:"\x1b[47m" };

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Public Log Method
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            public static log(message: string | string[], type: string = 'log', response? : any): any {
                  switch (type) {
                        case 'info':      return this.echo(message, 'INFO', 'fgGray');
                        case 'warn':      return this.echo(message, 'WARN', 'fgYellow');
                        case 'error':     return this.echo(message, 'ERR ', 'fgRed');
                        case 'success':   return this.echo(message, '   ►', 'fgBlue');
                        case 'debug':     return this.echo(message, 'DBUG', 'fgGreen');
                        case 'timer':     return this.echo(message, '   ∞', 'fgCyan');
                        case 'head':      return this.head(message, 'bgBlue');
                        case 'complete':  return this.head(message, 'bgYellow');
                        case 'break':     this.head(message, 'bgRed'); throw new Error(message.toString());
                        default:          this.echo(message, 'LOG ', 'fgWhite');
                  }
                  return response;
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Echo Output
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static echo(message: string | string[], tag: string, color: string): void {
                  const lines = (typeof message === 'string') ? [message] : message;
                  for (const line of lines) {
                        const output = `${this.colors[color]}[${tag}] - ${new Date().toLocaleTimeString()} - ${line}`;
                        console.log(this.wrap(output));
                  }
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Headline Output
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static head(message: string | string[], bgColor: string = 'bgBlue'): void {
                  const width = 120;
                  const lines = (typeof message === 'string') ? [message] : message;
                  console.log('');
                  for (const line of lines) {
                        const indent = '  ' + line + ' '.padEnd(width - line.length - 2);
                        console.log(this.colors[bgColor] + this.colors.fgWhite + indent + this.colors.reset);
                  }
                  console.log('');
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Wrap Line
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            private static wrap(line: string): string {
                  return this.colors.reset + "     " + line + this.colors.reset + ` [PID:${process.pid}]`;
            }

      }
