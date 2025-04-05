import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

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

    log('Building core + plugins...');
    execSync('npm run build', { stdio: 'inherit' });

    log('Committing and pushing...');
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "release: v${nextVersion}"`, { stdio: 'inherit' });
    execSync(`git tag v${nextVersion}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });

    log('Publishing core to npm...');
    execSync('npm publish --access public', { stdio: 'inherit' });

    log('Publishing plugins...');
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

        // Publish the plugin
        try {
            log(`📤 Publishing ${plugin.name}@${nextPluginVersion}`);
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
