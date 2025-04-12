import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import crypto from 'crypto';

// Logger
const log = (msg) => console.log(`\x1b[36m[release]\x1b[0m ${msg}`);

// Version Helper
function bumpVersion(version, type = 'patch') {
    const parts = version.split('.').map(Number);
    if (type === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
    else if (type === 'minor') { parts[1]++; parts[2] = 0; }
    else { parts[2]++; }
    return parts.join('.');
}

// Plugin Finder
function findPlugins(dir) {
    const result = [];
    for (const name of readdirSync(dir)) {
        const fullPath = path.join(dir, name);
        if (statSync(fullPath).isDirectory()) {
            const pluginPath = path.join(fullPath, 'package.json');
            if (statSync(pluginPath, { throwIfNoEntry: false })) {
                result.push(fullPath);
            } else {
                result.push(...findPlugins(fullPath));
            }
        }
    }
    return result;
}

// Function to get MD5 hash of the file
function getFileHash(filePath) {
    const fileBuffer = readFileSync(filePath);
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);
    return hash.digest('hex');
}

// Check if the hash has changed
function hasHashChanged(pluginDir) {
    const indexFile = path.join(pluginDir, 'dist', 'index.js');
    const hashFile = path.join(pluginDir, '.index.hash.md5');

    log(`Checking hash for: ${indexFile}`);

    if (statSync(indexFile, { throwIfNoEntry: false })) {
        if (statSync(hashFile, { throwIfNoEntry: false })) {
            const storedHash = readFileSync(hashFile, 'utf8').trim();
            const currentHash = getFileHash(indexFile);
            log(`Stored hash: ${storedHash}, Current hash: ${currentHash}`);
            return storedHash !== currentHash;
        }

        log('No hash file found. Considering it changed.');
        return true;
    }

    log(`No index.js found in ${pluginDir}`);
    return false;
}

// Main
try {
    log(`Args: ${process.argv.slice(2).join(', ')}`);
    log('Reading core package.json...');
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    const currentVersion = pkg.version;
    const bumpType = process.argv.find(arg => ['--major', '--minor'].includes(arg))?.replace('--', '') || 'patch';
    const nextVersion = bumpVersion(currentVersion, bumpType);
    pkg.version = nextVersion;
    writeFileSync('package.json', JSON.stringify(pkg, null, 3));
    log(`Version bumped: ${currentVersion} → ${nextVersion}`);

    log('Committing and pushing...');

    // Git commit and push for plugins
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "release: v${nextVersion}"`, { stdio: 'inherit' });
    execSync(`git tag v${nextVersion}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });

    log('Building plugins...');
    const plugins = findPlugins('src/plugins');
    for (const dir of plugins) {
        const pluginPkg = path.join(dir, 'package.json');
        const plugin = JSON.parse(readFileSync(pluginPkg, 'utf8'));

        // Bump plugin version
        const currentPluginVersion = plugin.version;
        const nextPluginVersion = bumpVersion(currentPluginVersion, bumpType);
        plugin.version = nextPluginVersion;
        writeFileSync(pluginPkg, JSON.stringify(plugin, null, 3));

        log(`→ ${plugin.name} (${currentPluginVersion}) → ${nextPluginVersion}`);

        // Build each plugin before publishing
        log(`Building ${plugin.name}@${nextPluginVersion}`);
        execSync('npm run build', { cwd: dir, stdio: 'inherit' });

        // Only publish the plugin if the hash has changed
        if (!hasHashChanged(dir)) {
            log(`⚠️  Skipping ${plugin.name}@${nextPluginVersion} (no changes to index.js)`);
            continue;
        }

        try {
            log(`📤 Publishing ${plugin.name}@${nextPluginVersion}`);

            // Save the new hash
            const indexFile = path.join(dir, 'dist', 'index.js');
            const hash = getFileHash(indexFile);
            writeFileSync(path.join(dir, '.index.hash.md5'), hash);

            execSync('npm publish --access public', { cwd: dir, stdio: 'inherit' });
        } catch (err) {
            console.error(`\x1b[31m[release:plugin:error]\x1b[0m Failed to publish ${plugin.name}@${nextPluginVersion}`);
            console.error(err.message || err);
        }
    }

    log(`✅ Release complete! Version: ${nextVersion}`);
} catch (err) {
    console.error('\x1b[31m[release error]\x1b[0m', err.message || err);
    process.exit(1);
}
