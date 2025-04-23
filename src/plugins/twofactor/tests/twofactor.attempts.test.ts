import app from '@babl.one/core';

import { describe, it, expect, beforeEach } from 'vitest';
import TwoFactorAttempts       from '../classes/attempts';
import type TwoFactorConfig    from '../interfaces/twofactor.config';

app.twofactor = {
      attempts : {
            can: () => ({ allowed: true }) // always allow for testing
      }
};

describe('TwoFactorAttempts', () => {
      let twoFactor     : TwoFactorAttempts;
      const identifier = 'user@example.com';
      const ip         = '192.168.0.1';

      const config: TwoFactorConfig = {
            intervals: {
                  sends: 60,               // 60 seconds window
                  attempts: 60,
                  lockedIdentifiers: 300, // 5 minutes
                  lockedIPs: 300,
                  watchdog : 5
            },
            maximums: {
                  sends: 3,
                  attempts: 5,
                  lockedIdentifiers: 3,
                  lockedIPs: 5
            },
            thresholds: {
                  sends: 25,
                  attempts: 25,
                  lockedIdentifiers: 40,
                  lockedIPs: 30
            }
      };

      beforeEach(() => {
            twoFactor = new TwoFactorAttempts(config);
      });

      it('allows actions within the send limit', () => {
            const result1 = twoFactor.can('send', identifier, ip);
            const result2 = twoFactor.can('send', identifier, ip);
            const result3 = twoFactor.can('send', identifier, ip);

            expect(result1.allowed).toBe(true);
            expect(result2.allowed).toBe(true);
            expect(result3.allowed).toBe(true);
      });

      it('blocks send action when over the limit', () => {
            twoFactor.can('send', identifier, ip);
            twoFactor.can('send', identifier, ip);
            twoFactor.can('send', identifier, ip);
            const result = twoFactor.can('send', identifier, ip);

            expect(result.allowed).toBe(false);
            expect(result.reason).toBe('TF_RATEID');
            expect(result.expiresAt).toBeInstanceOf(Date);
      });

      it('blocks identifier while it is locked', () => {
            // Manually lock identifier
            const now = Date.now();
            (twoFactor as any).lockedIdentifiers[identifier] = new Date(now + 300000);

            const result = twoFactor.can('send', identifier, ip);

            expect(result.allowed).toBe(false);
            expect(result.reason).toBe('TF_LOCKID');
      });

      it('blocks ip while it is locked', () => {
            const now = Date.now();
            (twoFactor as any).lockedIPs[ip] = new Date(now + 300000);

            const result = twoFactor.can('send', identifier, ip);

            expect(result.allowed).toBe(false);
            expect(result.reason).toBe('TF_LOCKIP');
      });

      it('allows attempt actions up to max', () => {
            for (let i = 0; i < config.maximums.attempts; i++) {
                  const result = twoFactor.can('attempt', identifier, ip);
                  expect(result.allowed).toBe(true);
            }
      });

      it('blocks after too many attempts', () => {
            for (let i = 0; i < config.maximums.attempts; i++) {
                  twoFactor.can('attempt', identifier, ip);
            }

            const result = twoFactor.can('attempt', identifier, ip);
            expect(result.allowed).toBe(false);
            expect(result.reason).toBe('TF_RATEID');
      });
});
