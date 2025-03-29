/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: release.mjs
//|| Standalone Release Script - Bumps patch version, builds, commits, tags, pushes, and publishes
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Dependencies
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { execSync }                       from 'node:child_process';
      import { readFileSync, writeFileSync }    from 'node:fs';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Logger
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      const log = (msg) => console.log(`\x1b[36m[release]\x1b[0m ${msg}`);

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Main Execution
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      try {
            log('Reading package.json...');
            const pkg                  = JSON.parse(readFileSync('package.json', 'utf8'));

            const currentVersion       = pkg.version;
            const nextVersion          = bumpPatch(currentVersion);
            pkg.version                = nextVersion;

            writeFileSync('package.json', JSON.stringify(pkg, null, 3));
            log(`Version bumped: ${currentVersion} → ${nextVersion}`);

            log('Building project...');
            execSync('npm run build', { stdio: 'inherit' });

            log('Committing and pushing...');
            execSync('git add .', { stdio: 'inherit' });
            execSync(`git commit -m "release: v${nextVersion}"`, { stdio: 'inherit' });
            execSync(`git tag v${nextVersion}`, { stdio: 'inherit' });
            execSync('git push && git push --tags', { stdio: 'inherit' });

            log('Publishing to npm...');
            execSync('npm publish --access public', { stdio: 'inherit' });

            log(`✅ Release complete! Version: ${nextVersion}`);

      } catch (err) {
            console.error('\x1b[31m[release error]\x1b[0m', err.message || err);
            process.exit(1);
      }


      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Patch Bump Helper
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      function bumpPatch(version) {
            const parts                = version.split('.').map(Number);
            parts[2]++;
            return parts.join('.');
      }
