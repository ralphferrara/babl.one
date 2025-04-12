const fs = require('fs');
const path = require('path');

// Logger
const log = (msg) => console.log(`\x1b[36m[update-peer-dependencies]\x1b[0m ${msg}`);

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

  // Check if '@babl.one/core' is in dependencies and move it to peerDependencies
  if (packageJson.dependencies && packageJson.dependencies['@babl.one/core']) {
    const coreVersion = packageJson.dependencies['@babl.one/core'];

    // Remove @babl.one/core from dependencies
    delete packageJson.dependencies['@babl.one/core'];

    // Add @babl.one/core to peerDependencies
    if (!packageJson.peerDependencies) {
      packageJson.peerDependencies = {};
    }
    packageJson.peerDependencies['@babl.one/core'] = '@babl.one/core@latest';

    log(`Moved '@babl.one/core' from dependencies to peerDependencies in ${pluginDir}`);
  } else {
    log(`'@babl.one/core' not found in dependencies in ${pluginDir}`);
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
