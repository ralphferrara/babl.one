const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Path to the plugins directory
const pluginsDir = path.resolve(__dirname, 'src/plugins');

// Function to run the install command in each plugin directory
function installPluginDependencies() {
  // Read the plugin directories in the src/plugins folder
  fs.readdir(pluginsDir, (err, files) => {
    if (err) {
      console.error('Error reading plugins directory:', err);
      return;
    }

    // Loop through each directory and install the package
    files.forEach((file) => {
      const pluginPath = path.join(pluginsDir, file);

      // Only process directories
      if (fs.lstatSync(pluginPath).isDirectory()) {
        console.log(`Installing '@babl.one/core@latest' in ${pluginPath}...`);

        // Run `npm install '@babl.one/core@latest'` in each plugin directory
        exec('npm install @babl.one/core@latest', { cwd: pluginPath }, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error installing in ${pluginPath}:`, error);
            return;
          }
          if (stderr) {
            console.error(`stderr in ${pluginPath}:`, stderr);
          }
          console.log(`stdout in ${pluginPath}:`, stdout);
        });
      }
    });
  });
}

// Run the function
installPluginDependencies();