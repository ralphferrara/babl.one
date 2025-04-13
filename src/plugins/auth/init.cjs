const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Define the path to your configuration file
const configFilePath = path.resolve(__dirname, "../../../config/auth.json"); // Adjusting the path to the root project directory

// Function to generate random keys
function generateRandomKey() {
    return crypto.randomBytes(32).toString('hex'); // Generates a 256-bit hex key
}

// Read the config file
fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading auth.json:', err);
        return;
    }

    // Parse the JSON data
    let config = JSON.parse(data);

    // Check and replace the default values
    if (config.secretJWT === 'INIT_REPLACE_ME') {
        config.secretJWT = generateRandomKey();
        console.log('Generated new secretJWT key.');
    }

    if (config.secretPassword === 'INIT_REPLACE_ME') {
        config.secretPassword = generateRandomKey();
        console.log('Generated new secretPassword key.');
    }

    // Write the updated config back to the file if changes were made
    fs.writeFile(configFilePath, JSON.stringify(config, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing auth.json:', writeErr);
            return;
        }

        console.log('auth.json updated successfully.');
    });
});
