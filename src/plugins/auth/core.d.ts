import type { Core } from '@babl.one/core';
import type Auth from './classes/auth';

declare module '@babl.one/core' {
   interface Core {
      auth: Auth;
   }
}
