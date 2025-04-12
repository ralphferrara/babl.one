// generateCredentials.mjs
import { generateRandomString } from './utils/randomString.mjs';

export function generateCredentials() {
  const username = generateRandomString(8);  // Generate 8-character username
  const password = generateRandomString(16); // Generate 16-character password

  return { username, password };
}