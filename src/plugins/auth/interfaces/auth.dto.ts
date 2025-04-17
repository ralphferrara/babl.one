/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Maestro.js :: /interfaces/auth.dto.ts
//|| AuthDTO
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Types
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { AuthActions, IdentifierType, AuthStatuses, AccountStatuses }   from './types';
      import { PageLevel }                                                    from '@babl.one/server-router';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| LoginDTO
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export interface AuthDTO {
            status             : AuthStatuses;
            site               : string;
            identifier         : string;
            ip?                : string;
            userAgent?         : string;
            idType             : IdentifierType;
            password?          :  {
                  provided         : string;
                  encrypted?       : string;
            },
            location?          : {
                  country          : string;
                  region           : string;
                  city             : string;
                  latitude         : string;
                  longitude        : string;
            },
            action             : AuthActions;
            twoFactor          : {
                  required          : boolean;
                  jwt?              : string;
                  code?             : number;
            }
            user? : {
                  id?                : number;
                  status?            : AccountStatuses;
                  level?             : PageLevel;
            }
            authJWT?            : string;
            session?            : string;
      }