import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import https from 'https';

const PLUGIN_ROOT = path.resolve('src/plugins');
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

async function getPublishedVersions(pkgName: string): Promise<string[]> {
   const encoded = encodeURIComponent(pkgName);
   const url = `https://registry.npmjs.org/${encoded}`;
   return new Promise(resolve => {
      https.get(url, res => {
         let data = '';
         res.on('data', chunk => (data += chunk));
         res.on('end', () => {
            try {
               const json = JSON.parse(data);
               resolve(Object.keys(json.versions || {}));
            } catch {
               resolve([]);
            }
         });
      }).on('error', () => resolve([]));
   });
}

const pluginPackages = findPluginPackages(PLUGIN_ROOT);

for (const pkgPath of pluginPackages) {
   const dir = path.dirname(pkgPath);
   const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
   const current = pkg.version;

   const publishedVersions = await getPublishedVersions(pkg.name);
   let next = current;

   // Keep bumping until we find an unpublished version
   while (publishedVersions.includes(next)) {
      next = bumpVersion(next, bumpType);
   }

   if (next === current) {
      log(`⚠️  ${pkg.name} already at latest unpublished version`);
   } else {
      pkg.version = next;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));
      log(`📦 ${pkg.name}: ${current} → ${next}`);
   }

   try {
      log(`📤 Publishing ${pkg.name}@${next}`);
      execSync(`npm publish ${dir} --access public`, { stdio: 'inherit' });
   } catch (err) {
      console.error(`\x1b[31m[release:plugin:error]\x1b[0m Failed to publish ${pkg.name}@${next}`);
      console.error(err.message || err);
   }
}
