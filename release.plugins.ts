import path from 'path';
import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';

const PLUGIN_ROOT = path.resolve('src/plugins');
const bumpType = process.argv.find(arg => ['--major', '--minor'].includes(arg))?.replace('--', '') || 'patch';

const log = (msg: string) => console.log(`\x1b[36m[release:plugin]\x1b[0m ${msg}`);

// Version bumping logic
function bumpVersion(version: string, type: string = 'patch'): string {
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

// Check if a version exists on NPM
async function versionExists(pkgName: string, version: string): Promise<boolean> {
   const url = `https://registry.npmjs.org/${encodeURIComponent(pkgName)}`;
   return new Promise(resolve => {
      https.get(url, res => {
         let body = '';
         res.on('data', chunk => body += chunk);
         res.on('end', () => {
            try {
               const data = JSON.parse(body);
               resolve(data.versions?.[version] !== undefined);
            } catch {
               resolve(false);
            }
         });
      }).on('error', () => resolve(false));
   });
}

// Find all plugin package.json files
function findPluginPackages(dir: string): string[] {
   return fs.readdirSync(dir)
      .map(name => path.join(dir, name, 'package.json'))
      .filter(pkgPath => fs.existsSync(pkgPath));
}

// Main
const pluginPackages = findPluginPackages(PLUGIN_ROOT);

for (const pkgPath of pluginPackages) {
   const dir = path.dirname(pkgPath);
   const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
   const current = pkg.version;

   let next = current;
   while (await versionExists(pkg.name, next)) {
      log(`⚠️  ${pkg.name}@${next} already published. Bumping...`);
      next = bumpVersion(next, bumpType);
   }

   if (next !== current) {
      pkg.version = next;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));
      log(`📦 ${pkg.name}: ${current} → ${next}`);
   } else {
      log(`✅ ${pkg.name} is already unpublished at ${current}`);
   }

   try {
      log(`📤 Publishing ${pkg.name}@${pkg.version}`);
      execSync(`npm publish ${dir} --access public`, { stdio: 'inherit' });
   } catch (err: any) {
      console.error(`\x1b[31m[release:plugin:error]\x1b[0m Failed to publish ${pkg.name}@${pkg.version}`);
      console.error(err.message || err);
   }
}
