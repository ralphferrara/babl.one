
import type { Core } from '@babl.one/core';
import type { TwoFactor } from './twofactor';

declare module '@babl.one/core' {
      interface Core {
            twofactor: TwoFactorPlugin;
      }
}