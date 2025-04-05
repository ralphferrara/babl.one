import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { build } from 'tsup';

const PLUGIN_ROOT = path.resolve('plugins');
const bumpType = process.argv.find(arg => ['--major', '--minor'].includes(arg))?.replace('--', '') || 'patch';

// Logger
const log = (msg: string) => console.log(`\x1b[36m[release:plugin]\x1b[0m ${msg}`);

// Version bumper
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

// Find plugin package.json files
function findPluginPackages(dir: string): string[] {
   return fs.readdirSync(dir)
      .map(p => path.join(dir, p, 'package.json'))
      .filter(pkgPath => fs.existsSync(pkgPath));
}

// Main
const pluginPackages = findPluginPackages(PLUGIN_ROOT);

for (const pkgPath of pluginPackages) {
   const dir = path.dirname(pkgPath);
   const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
   const current = pkg.version;
   const next = bumpVersion(current, bumpType);
   pkg.version = next;

   fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));
   log(`📦 ${pkg.name}: ${current} → ${next}`);

   // ✅ Build plugin before publish
   const entry = path.join(dir, 'index.ts');
   await build({
      entry: [entry],
      outDir: path.join('dist/plugins', path.relative(PLUGIN_ROOT, dir)),
      format: ['esm'],
      target: 'es2022',
      clean: true,
      dts: false
   });

   log(`📤 Publishing ${pkg.name}@${next}`);
   execSync(`npm publish ${dir} --access public`, { stdio: 'inherit' });
}
