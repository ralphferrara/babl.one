#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';

const log = (msg) => console.log(`\x1b[35m[release]\x1b[0m ${msg}`);

const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const current = pkg.version;

const bumpType = process.argv.includes('--minor')
   ? 'minor'
   : process.argv.includes('--major')
   ? 'major'
   : 'patch';

const next = bump(current, bumpType);
pkg.version = next;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));
log(`📦 Version bumped: ${current} → ${next}`);

log(`📤 Publishing to npm...`);
execSync('npm publish --access public', { stdio: 'inherit' });

log(`✅ Done! v${next} is live.`);

// Version bump logic
function bump(ver, type) {
   const [major, minor, patch] = ver.split('.').map(Number);
   return type === 'major'
      ? `${major + 1}.0.0`
      : type === 'minor'
      ? `${major}.${minor + 1}.0`
      : `${major}.${minor}.${patch + 1}`;
}
