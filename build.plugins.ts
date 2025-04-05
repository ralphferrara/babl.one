import { build } from 'tsup';
import path from 'path';
import fs from 'fs';

const PLUGIN_ROOT = path.resolve('src/plugins');

// Utility: Find plugin folders (each must have its own `package.json`)
function findPluginDirs(dir: string): string[] {
   return fs.readdirSync(dir)
      .map(subdir => path.join(dir, subdir))
      .filter(sub => fs.statSync(sub).isDirectory() && fs.existsSync(path.join(sub, 'index.ts')));
}

// Build each plugin individually
const pluginDirs = findPluginDirs(PLUGIN_ROOT);

for (const dir of pluginDirs) {
   console.log(`📦 Building plugin in: ${dir}`);

   await build({
      entry: [path.join(dir, 'index.ts')],
      outDir: path.join('dist/plugins', path.relative(PLUGIN_ROOT, dir)),
      format: ['esm'],
      target: 'es2022',
      splitting: false,
      clean: true,
      dts: false
   });
}
