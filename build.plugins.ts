import { build } from 'tsup';
import { readdirSync, statSync } from 'fs';
import path from 'path';

// Normalize paths to use forward slashes
const toPosix = (p: string) => p.split(path.sep).join(path.posix.sep);

const walk = (dir: string, filelist: string[] = []) => {
   const files = readdirSync(dir);
   files.forEach(file => {
      const filepath = path.join(dir, file);
      const stat = statSync(filepath);
      if (stat.isDirectory()) {
         walk(filepath, filelist);
      } else if (file === 'index.ts') {
         filelist.push(toPosix(filepath));
      }
   });
   return filelist;
};

const pluginFiles = walk('src/plugins');

console.log('Plugin Files:', pluginFiles);

await build({
   entry: pluginFiles,
   outDir: 'dist',
   format: ['esm'],
   target: 'es2022',
   splitting: false,
   clean: true,
   dts: false,
});
