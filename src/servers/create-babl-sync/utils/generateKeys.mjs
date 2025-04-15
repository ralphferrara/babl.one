// generateKeys.mjs
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function generateKeys() {
  // Generate RSA key pair (private and public keys)
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,  // 2048 bits key size
    publicKeyEncoding: {
      type: 'pkcs1',       // PEM format
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',       // PEM format
      format: 'pem',
      cipher: 'aes-256-cbc',  // Optionally encrypt private key with password
      passphrase: 'your-password-here'  // Secure passphrase for private key encryption
    }
  });

  // Save the keys to files
  const keysDir = path.resolve(process.cwd(), 'keys');
  if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir); // Create the 'keys' directory if it doesn't exist
  }

  fs.writeFileSync(path.join(keysDir, 'private.key'), privateKey);
  fs.writeFileSync(path.join(keysDir, 'public.key'), publicKey);

  console.log('RSA key pair generated and saved to /keys');

  return publicKey;
}