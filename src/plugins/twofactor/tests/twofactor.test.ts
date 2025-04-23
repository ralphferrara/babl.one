/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /plugins/twofactor/tests/twofactor.test.ts
//|| Test for the twofactor plugin
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      
      import * as crypto                      from 'crypto';
      import TwoFactor                       from '../index';
      import { describe, it, expect, beforeEach } from 'vitest';
      import app                             from '@babl.one/core';
      import type { TwoFactorActionTypes }   from '../interfaces/types';
      import type TwoFactorConfig            from '../interfaces/twofactor.config';


      // Mocks
      const site       = 'example.com';
      const identifier = 'user123';
      const action     = 'REGISTER' satisfies TwoFactorActionTypes;
      const secret     = 'your-secret-key';
      const ip         = '127.0.0.1';

      const mockConfig: TwoFactorConfig = {
            intervals: {
                  sends: 60,
                  attempts: 60,
                  lockedIdentifiers: 300,
                  lockedIPs: 300,
                  watchdog: 5
            },
            maximums: {
                  sends: 3,
                  attempts: 3,
                  lockedIdentifiers: 3,
                  lockedIPs: 3
            },
            thresholds: {
                  sends: 25,
                  attempts: 25,
                  lockedIdentifiers: 40,
                  lockedIPs: 30
            }
      };

      
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Describe
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      describe('TwoFactor Class', () => {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Before
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
            beforeEach(() => {
                  // Reset app.twofactor mock before each test
                  app.twofactor = {
                        attempts: {
                              can: () => ({ allowed: true })
                        }
                  };
            });
      
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Valid Check
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            it('should generate a valid JWT token for 2FA', () => {
                  const { jwt, code }                 = TwoFactor.generate(site, identifier, action, secret);
                  expect(jwt).toBeTruthy();
                  expect(code).toBeDefined();
                  expect(typeof code).toBe('number');
                  expect(code).toBeGreaterThanOrEqual(100000);  // Ensure code is 6 digits
                  expect(code).toBeLessThanOrEqual(999999);  // Ensure code is 6 digits
            });

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Invalid Check
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            it('should validate the correct 2FA code', () => {
                  const { jwt, code }     = TwoFactor.generate(site, identifier, action, secret);
                  const validated         = TwoFactor.validate(jwt, code, secret);
                  expect(validated.validated).toBe(true);  // Expect the validation to be successful
                  expect(validated.identifier).toBe(identifier);  // Expect the code to match
                  expect(validated.site).toBe(site);  // Expect the site to match
            });

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Bad Code
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            it('should fail to validate an invalid code', () => {
                  const { jwt, code }     = TwoFactor.generate(site, identifier, action, secret);
                  const validated         = TwoFactor.validate(jwt, 12345, secret); // will always fail
                  expect(validated.validated).toBe(false);  // Expect the validation to be successful
                  expect(validated.identifier).toBe(undefined);  // Expect the code to match
            });

      });
