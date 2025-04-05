import { execSync } from 'child_process';
import { readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';

const walk = (dir: string): string[] => {
   let dirs: string[] = [];
   for (const entry of readdirSync(dir)) {
      const entryPath = path.join(dir, entry);
      if (statSync(entryPath).isDirectory()) {
         if (readdirSync(entryPath).includes('package.json')) {
            dirs.push(entryPath);
         }
         dirs = dirs.concat(walk(entryPath));
      }
   }
   return dirs;
};

const pluginDirs = walk('src/plugins');

for (const dir of pluginDirs) {
   const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf-8'));
   console.log(`🚀 Publishing: ${pkg.name}@${pkg.version}`);
   execSync(`npm publish --access public`, { cwd: dir, stdio: 'inherit' });
}
