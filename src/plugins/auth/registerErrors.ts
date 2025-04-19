//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /src/registerErrors.ts
//|| Register a list of error codes
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                     from "@babl.one/core";

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Login
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      app.registerError('BADCHIRP',       'Chirp data is missing');
      app.registerError('AUTH_UNKNOWN',   'Identifier is missing');
      app.registerError('AUTH_LGNMID',    'Identifier is missing');
      app.registerError('AUTH_LGNMPW',    'Password is missing');
      app.registerError('AUTH_LNGTMY',    'Too many login attempts');
      app.registerError('AUTH_FAILED',    'Password Mismatch');
      app.registerError('AUTH_DELETED',   'Account has been deleted');
      app.registerError('AUTH_BANNED',    'Account has been banned');
      app.registerError('AUTH_LOCKED',    'Account is locked');
      app.registerError('AUTH_UNKNOWN',   'Unknown error');
      app.registerError('AUTH_LGNJWT',    'JWT token could not be generated');
      app.registerError('AUTH_FWRSES',    'Failed to write session');
      app.registerError('AUTH_ONLYEP',    'Only email or phone number are allowed');
      app.registerError('AUTH_INVEML',    'Invalid email address');
      app.registerError('AUTH_INVPHN',    'Invalid phone number');
      app.registerError('AUTH_TFJWT',     'Two Factor JWT is missing');
      app.registerError('AUTH_TFCODE',    'Two Factor code is required');
      app.registerError('AUTH_TFUID',     'Two Factor identifier is missing');
      app.registerError('AUTH_REGFAIL',   'Failed to create a new account');
      app.registerError('AUTH_USRMISS',   'Could not find account');
      app.registerError('AUTH_NORENEW',   'Could not renew JWT');
      app.registerError('AUTH_INVJWT',    'Invalid Authorization token');
      app.registerError('AUTH_SEXPIRED',  'Session has expired');
      app.registerError('AUTH_SUCCESS',   'Authorization Successful');
      app.registerError('AUTH_LOWPERM',   'Insufficient permissions to access');
      app.registerError('AUTH_NOAUTH',    'Authorization headers were not provided');
      app.registerError('AUTH_UNMISS',    'Username is missing');
      app.registerError('AUTH_UNEXST',    'Username already exists');
      app.registerError('AUTH_BADAGE',    'Age provided is invalid');
      app.registerError('AUTH_NOTOLD',    'Sorry, you are not old enough to access this site');
      app.registerError('LOGGEDOUT',      'You have been logged out');
      app.registerError('MISS_AGE',       'Missing parameter: age');
