import { mkdir, readdir, stat, copyFile } from 'fs/promises';
import path from 'path';

export default async function copyDefaultPlugins() {
      const localPluginsDir   = path.resolve('src/plugins');
      const defaultPluginsDir = path.resolve('node_modules/@babl.one/plugins');
   
      try {
            await mkdir(localPluginsDir, { recursive: true });
            const files = await readdir(defaultPluginsDir);
   
            for (const file of files) {
                  const srcPath = path.join(defaultPluginsDir, file);
                  const destPath = path.join(localPluginsDir, file);
   
                  try {
                        await stat(destPath); // already exists
                  } catch {
                        await copyFile(srcPath, destPath);
                        console.log(`Copied default plugin: ${file}`);
                  }
            }
      } catch (err) {
            console.log('Failed to copy default plugins:', err);
      }
   };