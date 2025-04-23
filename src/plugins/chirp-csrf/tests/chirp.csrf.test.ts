import { describe, test, expect, vi } from 'vitest'; // or use `jest` if you're using Jest
import { createHash } from 'crypto';
import { ChirpCSRF } from '../index'; // adjust the path

interface ConfigCSRF {
      expires: number; // in seconds
      secret: string;
}

describe('ChirpCSRF', () => {
      const config: ConfigCSRF = {
            expires: 2, // 2 seconds for quick testing
            secret: 'test_secret',
      };

      const csrf = new ChirpCSRF(config);
      const jwt = 'jwt_123';
      const session = 'session_abc';

      test('returns original token if valid and not expired', () => {
            const token = csrf.generate(jwt, session);
            const result = csrf.checkAndRefresh(token, jwt, session);
            expect(result).toBe(token);
      });

      test('returns undefined if token is invalid (tampered)', () => {
            const token = csrf.generate(jwt, session);
            const tampered = token.replace(/.$/, 'x'); // alter last char
            const result = csrf.checkAndRefresh(tampered, jwt, session);
            expect(result).toBeUndefined();
      });

      test('returns new token if expired', async () => {
            const shortConfig = { ...config, expires: 0 }; // immediate expiration
            const csrfShort = new ChirpCSRF(shortConfig);
            const token = csrfShort.generate(jwt, session);
      
            await new Promise(resolve => setTimeout(resolve, 10)); // slight delay
      
            const refreshed = csrfShort.checkAndRefresh(token, jwt, session);
            expect(refreshed).not.toBe(token);
            expect(typeof refreshed).toBe('string');
      });

      test('returns undefined for badly formatted token', () => {
            const badToken = Buffer.from('just.a.bad.token').toString('base64');
            const result = csrf.checkAndRefresh(badToken, jwt, session);
            expect(result).toBeUndefined();
      });

      test('returns undefined for completely invalid base64', () => {
            const result = csrf.checkAndRefresh('$$invalid$$', jwt, session);
            expect(result).toBeUndefined();
      });
});
