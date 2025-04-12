// writeEnvFile.mjs
import fs from 'fs';
import path from 'path';

export function writeEnvFile(username, password) {
  const envContent = `
MYSQL_USER=${username}
MYSQL_PASSWORD=${password}
  `.trim();

  const envFilePath = path.resolve(process.cwd(), '.env');

  fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' });

  console.log('Generated MySQL username and password and saved to .env');
  console.log(`MYSQL_USER=${username}`);
  console.log(`MYSQL_PASSWORD=${password}`);
}
