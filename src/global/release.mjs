// release.mjs (in ../../global/)
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Logger for release process
const log = (msg) => console.log(`\x1b[36m[release]\x1b[0m ${msg}`);

// Version Bumping Helper
function bumpVersion(version, type = 'patch') {
   const parts = version.split('.').map(Number);
   if (type === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
   else if (type === 'minor') { parts[1]++; parts[2] = 0; }
   else { parts[2]++; }
   return parts.join('.');
}

// Resolve from working dir (not __dirname!)
const cwd = process.cwd();
const pkgPath = path.resolve(cwd, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

// Determine bump type
const bumpType = process.argv.find(arg => ['--major', '--minor'].includes(arg))?.replace('--', '') || 'patch';
const currentVersion = pkg.version;
const nextVersion = bumpVersion(currentVersion, bumpType);

// Update and write package.json
pkg.version = nextVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));
log(`Version bumped: ${currentVersion} → ${nextVersion}`);

// Build and publish
log('Building package...');
execSync('npm run build', { cwd, stdio: 'inherit' });

log('Publishing to npm...');
execSync('npm publish --access public', { cwd, stdio: 'inherit' });

log(`✅ Release complete! Version: ${nextVersion}`);
