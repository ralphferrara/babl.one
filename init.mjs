#!/usr/bin/env node

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import fs                           from 'fs';
      import path                         from 'path';
      import readline                     from 'readline/promises';
      import { fileURLToPath }            from 'url';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Queue Plugin
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const rl        = readline.createInterface({ input: process.stdin, output: process.stdout });

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Queue Plugin
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      async function createBaseStructure() {
            const folders = [
                  'src',
                  'src/routes',
                  'src/plugins',
                  'config',
            ];

            for (const dir of folders) {
                  const fullPath = path.join(__dirname, dir);
                  if (!fs.existsSync(fullPath)) {
                        fs.mkdirSync(fullPath, { recursive: true });
                        console.log(`Created: ${dir}`);
                  }
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Queue Plugin
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function writeConfig(name, content) {
            const filePath = path.join(__dirname, 'config', name);
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
      //|| Init
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      async function runInit() {
            console.log('\n🚀 Initializing babl.one project...\n');

            await createBaseStructure();
            generateDefaultConfigs();

            const install = await rl.question('\nInstall core packages? (y/n): ');
            if (install.toLowerCase() === 'y') {
                  console.log('\n📦 Installing...');
                  const pkgs = [
                        '@babl.one',
                  ];
                  const { execSync } = await import('child_process');
                  execSync(`npm install ${pkgs.join(' ')}`, { stdio: 'inherit' });
            }

            console.log('\n✅ Done! Your babl.one app is ready.\n');
            rl.close();
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Run
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      runInit();
