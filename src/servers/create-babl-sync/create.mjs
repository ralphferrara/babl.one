// create.mjs
import { generateCredentials } from './generateCredentials.mjs';
import { writeEnvFile } from './writeEnvFile.mjs';
import { generateKeys } from './generateKeys.mjs';

// Generate credentials
const { username, password } = generateCredentials();

// Write credentials to .env file
writeEnvFile(username, password);

// Generate and save RSA key pair
const publicKey = generateKeys();
