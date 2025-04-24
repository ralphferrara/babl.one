
import type { Core } from '@babl.one/core';
import type Chirp  from './classes/chirp';

declare module '@babl.one/core' {
      interface Core {
            route(routePath : string, chirp: Chirp);
      }
}