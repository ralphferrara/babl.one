//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /src/registerErrors.ts
//|| Register a list of error codes
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                     from "@babl.one/core";

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Login
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      app.errors.set('BADCHIRP',       'Chirp data is missing');
      app.errors.set('AUTH_UNKNOWN',   'Identifier is missing');
      app.errors.set('AUTH_LGNMID',    'Identifier is missing');
      app.errors.set('AUTH_LGNMPW',    'Password is missing');
      app.errors.set('AUTH_LNGTMY',    'Too many login attempts');
      app.errors.set('AUTH_FAILED',    'Account not found or Password Mismatch');
      app.errors.set('AUTH_DELETED',   'Account has been deleted');
      app.errors.set('AUTH_BANNED',    'Account has been banned');
      app.errors.set('AUTH_LOCKED',    'Account is locked');
      app.errors.set('AUTH_UNKNOWN',   'Unknown error');
      app.errors.set('AUTH_LGNJWT',    'JWT token could not be generated');
      app.errors.set('AUTH_FWRSES',    'Failed to write session');
      app.errors.set('AUTH_ONLYEP',    'Only email or phone number are allowed');
      app.errors.set('AUTH_INVEML',    'Invalid email address');
      app.errors.set('AUTH_INVPHN',    'Invalid phone number');
      app.errors.set('AUTH_TFJWT',     'Two Factor JWT is missing');
      app.errors.set('AUTH_TFCODE',    'Two Factor code is required');
      app.errors.set('AUTH_TFUID',     'Two Factor identifier is missing');
      app.errors.set('AUTH_REGFAIL',   'Failed to create a new account');
      app.errors.set('AUTH_USRMISS',   'Could not find account');
      app.errors.set('AUTH_NORENEW',   'Could not renew JWT');
      app.errors.set('AUTH_INVJWT',    'Invalid Authorization token');
      app.errors.set('AUTH_SEXPIRED',  'Session has expired');
      app.errors.set('AUTH_SUCCESS',   'Authorization Successful');
      app.errors.set('AUTH_LOWPERM',   'Insufficient permissions to access');
      app.errors.set('AUTH_NOAUTH',    'Authorization headers were not provided');
      app.errors.set('AUTH_UNMISS',    'Username is missing');
      app.errors.set('AUTH_UNEXST',    'Username already exists');
      app.errors.set('AUTH_BADAGE',    'Age provided is invalid');
      app.errors.set('AUTH_NOTOLD',    'Sorry, you are not old enough to access this site');
      app.errors.set('LOGGEDOUT',      'You have been logged out');
      app.errors.set('MISS_AGE',       'Missing parameter: age');
      app.errors.set('AUTH_COMGEN',    'Missing parameter : gender');
      app.errors.set('AUTH_COMUSR',    'Missing parameter : username');
      app.errors.set('AUTH_COMPSW',    'Missing parameter : password');
      app.errors.set('AUTH_COMDOB',    'Missing parameter : birthday');
      app.errors.set('AUTH_PWUPFL',    'There was an error updating your password');
