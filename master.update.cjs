#!/usr/bin/env node

const fs       = require('fs');
const path     = require('path');
const { execSync } = require('child_process');

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Master Refresh Script :: Cleans and standardizes all plugins
//|| - Deletes node_modules and dist
//|| - Moves @babl.one/* to peerDependencies
//|| - Sets @babl.one/* version to "latest"
//|| - Runs npm update
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

const PLUGIN_DIR = path.resolve(__dirname, 'src/plugins');

if (!fs.existsSync(PLUGIN_DIR)) {
      console.error(`Plugins directory not found: ${PLUGIN_DIR}`);
      process.exit(1);
}

const pluginFolders = fs.readdirSync(PLUGIN_DIR)
      .filter(name => fs.statSync(path.join(PLUGIN_DIR, name)).isDirectory());

pluginFolders.forEach(folder => {
      const pluginPath = path.join(PLUGIN_DIR, folder);
      const pkgPath    = path.join(pluginPath, 'package.json');

      console.log(`\n🔄 Refreshing: ${folder}`);

      // Delete node_modules and dist
      const nodeModulesPath = path.join(pluginPath, 'node_modules');
      const distPath        = path.join(pluginPath, 'dist');

      [nodeModulesPath, distPath].forEach(dir => {
            if (fs.existsSync(dir)) {
                  fs.rmSync(dir, { recursive: true, force: true });
                  console.log(`🧹 Removed: ${dir}`);
            }
      });

      // Rewrite package.json
      if (!fs.existsSync(pkgPath)) {
            console.warn(`⚠️  Skipped (no package.json): ${folder}`);
            return;
      }

      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.peerDependencies = pkg.peerDependencies || {};

      const fromDeps = pkg.dependencies || {};
      const toRemove = [];

      Object.keys(fromDeps).forEach(dep => {
            if (dep.startsWith('@babl.one/')) {
                  pkg.peerDependencies[dep] = 'latest';
                  toRemove.push(dep);
            }
      });

      toRemove.forEach(dep => {
            delete pkg.dependencies[dep];
      });

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 6));
      console.log(`📦 Updated package.json: moved ${toRemove.length} to peerDependencies`);

      // Run npm update
      try {
            execSync('npm update', { cwd: pluginPath, stdio: 'inherit' });
            console.log(`⬆️  npm update complete`);
      } catch (err) {
            console.error(`❌ npm update failed for ${folder}`);
      }
});
