/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /interfaces/config.ts
//|| Provides the configuration for the Auth Class
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
      export interface AuthConfig {
            secretJWT                   : string;
            secretPassword              : string;
            passwordIterations          : number;
            passwordVersion             : string;
            jwtExpiresSeconds           : number;
            maxAttempts                 : number;
            lockoutTime                 : number;
      }
