import { describe, it, expect } from 'vitest';
import JWT from '../../classes/jwt';

describe('JWT', () => {

      const secret = 'super-secret-key';

      it('should create and sign a token correctly', () => {
            const jwt = new JWT();
            jwt.setPayload({ user: 'alice' });
            const token = jwt.sign(secret);

            expect(typeof token).toBe('string');
            expect(jwt.status).toBe('CREATED');
            expect(jwt.signature).not.toBe('');
      });

      it('should parse and verify a valid JWT', () => {
            const jwt = new JWT();
            jwt.setPayload({ user: 'bob' });
            const token = jwt.sign(secret);

            const parsed = JWT.parse(token, secret);
            expect(parsed.status).toBe('VALID');
            expect(parsed.payload).toEqual({ user: 'bob' });
      });

      it('should fail if signature is invalid', () => {
            const jwt = new JWT();
            jwt.setPayload({ user: 'charlie' });
            const token = jwt.sign('wrong-secret');

            const result = JWT.parse(token, secret);
            expect(result.status).toBe('FAILED');
            expect(result.payload).toEqual({});
      });

      it('should detect expired tokens', () => {
            const jwt = new JWT();
            jwt.setPayload({ expTest: true });
            jwt.setExpires(-10); // set it to expire in the past
            const token = jwt.sign(secret);

            const parsed = JWT.parse(token, secret);
            expect(parsed.status).toBe('EXPIRED');
      });

      it('should extract payload without verifying signature', () => {
            const jwt = new JWT();
            jwt.setPayload({ user: 'david' });
            const token = jwt.sign(secret);

            const insecure = JWT.getPayload(token);
            expect(insecure.status).toBe('INSECURE');
            expect(insecure.payload).toEqual({ user: 'david' });
      });
});
