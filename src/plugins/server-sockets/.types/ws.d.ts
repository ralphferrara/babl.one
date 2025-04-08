/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one Type Extension :: /.types/ws.d.ts
//|| Extends WebSocket Class to add UUID and Authenticated Properties
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

import type { WebSocket } from 'ws';

declare module 'ws' {
      interface WebSocket {
            uuid                    : string;
            authenticated           : boolean;
            isAuthenticated         : NodeJS.Timeout;
      }
}