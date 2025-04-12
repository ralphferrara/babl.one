const fs = require('fs');
const path = require('path');

// Logger
const log = (msg) => console.log(`\x1b[36m[move-core-to-dependencies]\x1b[0m ${msg}`);

// Path to the plugins directory
const pluginsDir = path.resolve(__dirname, 'src/plugins');

// Function to update dependencies in the plugin's package.json
function updatePackageJson(pluginDir) {
  const packageJsonPath = path.join(pluginDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    log(`No package.json found in ${pluginDir}`);
    return;
  }

  // Read the current package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Check if '@babl.one/core' is in peerDependencies and move it to dependencies
  if (packageJson.peerDependencies && packageJson.peerDependencies['@babl.one/core']) {
    const coreVersion = packageJson.peerDependencies['@babl.one/core'];

    // Remove @babl.one/core from peerDependencies
    delete packageJson.peerDependencies['@babl.one/core'];

    // Add @babl.one/core to dependencies
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    packageJson.dependencies['@babl.one/core'] = coreVersion;

    log(`Moved '@babl.one/core' from peerDependencies to dependencies in ${pluginDir}`);
  } else {
    log(`'@babl.one/core' not found in peerDependencies in ${pluginDir}`);
    return;
  }

  // Write the updated package.json back to the plugin's directory
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 3));
}

// Function to loop through all plugins and update their package.json
function updatePlugins() {
  const plugins = fs.readdirSync(pluginsDir);

  plugins.forEach((plugin) => {
    const pluginPath = path.join(pluginsDir, plugin);

    // Only process directories
    if (fs.statSync(pluginPath).isDirectory()) {
      updatePackageJson(pluginPath);
    }
  });
}

// Run the function
updatePlugins();
