import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

export function log(msg: string) {
   console.log(`\x1b[36m[release]\x1b[0m ${msg}`);
}

export function bumpVersion(version: string, type: 'patch' | 'minor' | 'major'): string {
   const [major, minor, patch] = version.split('.').map(Number);
   if (type === 'major') return `${major + 1}.0.0`;
   if (type === 'minor') return `${major}.${minor + 1}.0`;
   return `${major}.${minor}.${patch + 1}`;
}

export function readPackage(): any {
   return JSON.parse(readFileSync('package.json', 'utf8'));
}

export function writePackage(pkg: any) {
   writeFileSync('package.json', JSON.stringify(pkg, null, 3));
}

export function runCommand(cmd: string) {
   execSync(cmd, { stdio: 'inherit' });
}

export async function release(type: 'patch' | 'minor' | 'major' = 'patch') {
   log('Reading package.json...');
   const pkg = readPackage();

   const currentVersion = pkg.version;
   const nextVersion = bumpVersion(currentVersion, type);
   pkg.version = nextVersion;

   writePackage(pkg);
   log(`Version bumped: ${currentVersion} → ${nextVersion}`);

   log('Building project...');
   runCommand('npm run build');

   log('Committing and pushing...');
   runCommand('git add .');
   runCommand(`git commit -m "release: v${nextVersion}"`);
   runCommand(`git tag v${nextVersion}`);
   runCommand('git push && git push --tags');

   log('Publishing to npm...');
   runCommand('npm publish --access public');

   log(`✅ Release complete! Version: ${nextVersion}`);
}
