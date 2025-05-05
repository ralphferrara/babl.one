/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: .interfaces/middleware.ts
//|| Middleware Options
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export interface MiddlewareData {
            headers   : Record<string, string>;
            cookies   : Record<string, string>;
            method    : string;
            language  : string;
            protocol  : string;
            hostname  : string;
            root      : string;
            port      : string;
            path      : string;            
            query     : Record<string, string>;    
            authJWT   : string | null;        
            session   : string | null;
      }
