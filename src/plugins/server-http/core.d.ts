
import type { Core } from '@babl.one/core';
declare module '@babl.one/core' {
      interface Core {
            http(name: string = 'default') : any;
      }
}