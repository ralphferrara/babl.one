/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Interfaces: ContentClientAction
//|| Action Call for ContentClient
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      
      export interface ContentClientAction {
            action            : "missed" | "access";
            hostname          : string;
            path              : string;
            section           : string;
            area              : string;
            key               : string;
            value?            : string;
            message?           : string;
            status?           : "PENDING" | "COMPLETED" | "FAILED";
      }
