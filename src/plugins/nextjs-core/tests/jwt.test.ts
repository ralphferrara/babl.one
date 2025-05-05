import { describe, it, expect }           from 'vitest';
import JWT                                from '../index'; // Assuming the path is correct
import * as crypto                        from 'crypto';

describe('JWT Class', () => {
      const secret = 'your-secret-key';

      it('should create a valid JWT token', () => {
            // Step 1: Create a new JWT instance and set a payload
            const jwtInstance = new JWT();
            const payload = { foo: 'bar' };  // Example payload
            jwtInstance.setPayload(payload);
            jwtInstance.setExpires(600);  // Set expiration time (in seconds)

            // Step 2: Sign the JWT with a secret
            const token = jwtInstance.sign(secret);

            // Step 3: Parse the token
            const parsedJWT = JWT.parse(token, secret);

            // Step 4: Assert the parsed JWT is valid
            expect(parsedJWT.status).toBe('VALID');  // The status should be 'VALID'
            expect(parsedJWT.payload).toEqual(payload);  // The payload should match the original payload
      });

      it('should fail to validate a JWT with an invalid secret', () => {
            // Step 1: Create a valid JWT token using the correct secret
            const jwtInstance = new JWT();
            const payload = { foo: 'bar' };
            jwtInstance.setPayload(payload);
            jwtInstance.setExpires(600);
            const token = jwtInstance.sign(secret);

            // Step 2: Try to parse the token with an incorrect secret
            const invalidSecret = 'incorrect-secret';
            const parsedJWT = JWT.parse(token, invalidSecret);

            // Step 3: Assert that the JWT is invalid due to the wrong secret
            expect(parsedJWT.status).toBe('FAILED');  // The status should be 'FAILED' due to the invalid signature
      });

      it('should fail to validate an expired JWT token', () => {
            // Step 1: Create a valid JWT token
            const jwtInstance = new JWT();
            const payload = { foo: 'bar' };
            jwtInstance.setPayload(payload);

            // Set an expiration time in the past for testing expired JWT
            const expiredTime = Math.floor(Date.now() / 1000) - 1;  // Set to one second in the past
            jwtInstance.header.exp = expiredTime;

            const token = jwtInstance.sign(secret);

            // Step 2: Parse the expired token
            const parsedJWT = JWT.parse(token, secret);

            // Step 3: Assert that the JWT has expired
            expect(parsedJWT.status).toBe('EXPIRED');  // The status should be 'EXPIRED'
      });

      it('should fail to validate a malformed JWT token', () => {
            // Step 1: Provide a malformed JWT token
            const malformedToken = 'malformed.token.string';

            // Step 2: Parse the malformed token
            const parsedJWT = JWT.parse(malformedToken, secret);

            // Step 3: Assert that the JWT is invalid
            expect(parsedJWT.status).toBe('INVALID');  // Change to 'INVALID' as that's the expected status for a malformed JWT
      });
});
