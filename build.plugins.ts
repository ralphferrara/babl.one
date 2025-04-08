import { build } from 'tsup';
import path from 'path';
import fs from 'fs';

const PLUGIN_ROOT = path.resolve('src/plugins');
const DIST_ROOT   = path.resolve('dist/plugins');

// Ensure `dist/plugins` exists
if (!fs.existsSync(DIST_ROOT)) {
      fs.mkdirSync(DIST_ROOT, { recursive: true });
}

// Utility: Find plugin folders (each must have an index.ts)
function findPluginDirs(dir: string): string[] {
      return fs.readdirSync(dir)
            .map(subdir => path.join(dir, subdir))
            .filter(sub =>
                  fs.statSync(sub).isDirectory() &&
                  fs.existsSync(path.join(sub, 'index.ts'))
            );
}

// Build each plugin individually
const pluginDirs = findPluginDirs(PLUGIN_ROOT);

for (const dir of pluginDirs) {
      const relativePath = path.relative(PLUGIN_ROOT, dir);
      const outDir       = path.join(DIST_ROOT, relativePath);
      console.log(`📦 Building plugin in: ${dir}`);

      try {
            execSync(
                `npx tsup ${path.join(dir, 'index.ts')} --target es2022 --format esm --dts --out-dir ${outDir}`,
                { stdio: 'inherit' }
            );
            console.log(`✅ Plugin built successfully in: ${outDir}`);
        } catch (error) {
            console.error(`❌ Failed to build plugin in: ${outDir}`);
            console.error(error);
        }
}
