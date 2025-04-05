import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const PLUGIN_ROOT = path.resolve('plugins');
const bumpType = process.argv.find(arg => ['--major', '--minor'].includes(arg))?.replace('--', '') || 'patch';

const log = (msg: string) => console.log(`\x1b[36m[release:plugin]\x1b[0m ${msg}`);

function bumpVersion(version: string, type = 'patch'): string {
   const parts = version.split('.').map(Number);
   if (type === 'major') {
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
   } else if (type === 'minor') {
      parts[1]++;
      parts[2] = 0;
   } else {
      parts[2]++;
   }
   return parts.join('.');
}

function findPluginPackages(dir: string): string[] {
   return fs.readdirSync(dir)
      .map(name => path.join(dir, name, 'package.json'))
      .filter(pkg => fs.existsSync(pkg));
}

const pluginPackages = findPluginPackages(PLUGIN_ROOT);

for (const pkgPath of pluginPackages) {
   const dir = path.dirname(pkgPath);
   const oldPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
   const current = oldPkg.version;
   const next = bumpVersion(current, bumpType);

   // Write updated version
   const newPkg = { ...oldPkg, version: next };
   fs.writeFileSync(pkgPath, JSON.stringify(newPkg, null, 3));

   log(`📦 ${newPkg.name}: ${current} → ${next}`);

   try {
      log(`📤 Publishing ${newPkg.name}@${next}`);
      execSync(`npm publish ${dir} --access public`, { stdio: 'inherit' });
   } catch (err) {
      console.error(`\x1b[31m[release:plugin:error]\x1b[0m Failed to publish ${newPkg.name}@${next}`);
      console.error(err.message || err);
   }
}
