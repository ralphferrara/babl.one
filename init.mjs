#!/usr/bin/env node

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import fs                           from 'fs';
      import path                         from 'path';
      import readline                     from 'readline/promises';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Constants
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      const rl                            = readline.createInterface({ input: process.stdin, output: process.stdout });
      const root                          = process.cwd(); // ✅ Always use this

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Create Base Structure
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      async function createBaseStructure() {
            const folders = [
                  'src',
                  'src/routes',
                  'src/plugins',
                  'src/consumers',
                  'config',
            ];

            for (const dir of folders) {
                  const fullPath = path.join(root, dir);
                  if (!fs.existsSync(fullPath)) {
                        fs.mkdirSync(fullPath, { recursive: true });
                        console.log(`Created: ${dir}`);
                  }
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Create Default Config Files
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function writeConfig(name, content) {
            const filePath = path.join(root, 'config', name);
            if (!fs.existsSync(filePath)) {
                  fs.writeFileSync(filePath, JSON.stringify(content, null, 3));
                  console.log(`Config created: config/${name}`);
            }
      }

      function generateDefaultConfigs() {
            writeConfig('app.json', {
                  name: 'babl-app',
                  mode: 'dev',
                  log: 'pretty'
            });

            writeConfig('http.json', {
                  port: 3000,
                  instances: {
                        default: { port: 3000 }
                  }
            });

            writeConfig('database.mysql.json', {
                  default: {
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: 'babl'
                  }
            });

            writeConfig('database.mongo.json', {
                  default: {
                        uri: 'mongodb://localhost:27017/babl'
                  }
            });
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Create Entry File
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function createDevFile() {
            const file = path.join(root, 'index.ts');
            if (!fs.existsSync(file)) {
                  fs.writeFileSync(file,
      `/* Babl.one dev start file */
      import app from '@babl.one/core';

      app.init(() =>{
            // app.use('plugin-name');
      });`);
                  console.log(`Created: index.ts`);
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Create package.json (if missing)
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function createPackageJSON() {
            const file = path.join(root, 'package.json');
            if (!fs.existsSync(file)) {
                  const pkg = {
                        name: "babl-app",
                        version: "0.1.0",
                        type: "module",
                        scripts: {
                              dev: "tsx index.ts"
                        },
                        devDependencies: {
                              tsx: "^4.0.0"
                        }
                  };
                  fs.writeFileSync(file, JSON.stringify(pkg, null, 3));
                  console.log(`Created: package.json`);
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Init
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      async function runInit() {
            console.log('\n🚀 Initializing babl.one project...\n');

            await createBaseStructure();
            generateDefaultConfigs();
            createDevFile();
            createPackageJSON();

            const install = await rl.question('\nInstall core packages and dev dependencies? (y/n): ');
            if (install.toLowerCase() === 'y') {
                  console.log('\n📦 Installing...');
                  const pkgs = [
                        '@babl.one/core',
                        'tsx'
                  ];
                  const { execSync } = await import('child_process');
                  execSync(`npm install ${pkgs.join(' ')} --save`, { stdio: 'inherit' });
            }

            console.log('\n✅ Done! Your babl.one app is ready.\n');
            rl.close();
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Run
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      runInit();
