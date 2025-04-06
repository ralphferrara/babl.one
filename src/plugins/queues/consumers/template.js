const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve(__dirname, 'template', 'decorators', 'consumer.ts');
const destinationDir = path.resolve('src', 'decorators');
const destinationFile = path.join(destinationDir, 'consumers.ts');

try {
  // Check if the src/decorators directory exists, if not, create it
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  // Copy the template consumer.ts file to the destination
  fs.copyFileSync(sourceFile, destinationFile);
  console.log(`Successfully copied consumer.ts to ${destinationFile}`);
} catch (err) {
  console.error('Failed to copy consumer.ts:', err);
}
