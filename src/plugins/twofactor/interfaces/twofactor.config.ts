/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /interfaces/twofactor.config.ts
//|| Overview of the Config file
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| LoginDTO
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default interface TwoFactorConfig {
            secret             : string;                 // Secret used to sign the JWT
            intervals          : {
                  sends               : number;          // Number of seconds to expire sends - 15 minutes
                  attempts            : number;          // Number of seconds to expire attempts - 5 minutes
                  lockedIdentifiers   : number;          // Number of seconds to lockout an identifier - 120 minutes
                  lockedIPs           : number;          // Number of seconds to lockout IP - 1 hour
                  purge               : number;          // Number of seconds to run the watchdog - 5 seconds
                  health              : number;          // Number of seconds to run the health check - 5 minutes
            },
            maximums            : {
                  sends               : number;          // Number of sends allowed in the interval
                  attempts            : number;          // Number of attempts allowed in the interval
                  lockedIdentifiers   : number;          // Number of attempts allowed on an Identifier in the interval
                  lockedIPs           : number;          // Number of attempts allowed on an IP in the interval
            },
            thresholds          : {
                  sends               : number;          // % deviation in log space default 25%
                  attempts            : number;          // % deviation in log space default 25%
                  lockedIdentifiers   : number;          // % deviation in log space default 40%
                  lockedIPs           : number;          // % deviation in log space default 30%
            }
      }