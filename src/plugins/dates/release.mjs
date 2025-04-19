import {execSync} from "child_process";
import {readFileSync, writeFileSync} from "fs";
import path from "path";

// Logger for release process
const log = (msg) => console.log(`\x1b[36m[release]\x1b[0m ${msg}`);

// Version Bumping Helper
function bumpVersion(version, type = "patch") {
	const parts = version.split(".").map(Number);
	if (type === "major") {
		parts[0]++;
		parts[1] = 0;
		parts[2] = 0;
	} else if (type === "minor") {
		parts[1]++;
		parts[2] = 0;
	} else {
		parts[2]++;
	}
	return parts.join(".");
}

// Read the current version from package.json
const pkgPath = path.resolve("package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

// Get the current version and bump type (default: patch)
const currentVersion = pkg.version;
const bumpType =
	process.argv
		.find((arg) => ["--major", "--minor"].includes(arg))
		?.replace("--", "") || "patch";
const nextVersion = bumpVersion(currentVersion, bumpType);

// Update the version in package.json
pkg.version = nextVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 3));

log(`Version bumped: ${currentVersion} → ${nextVersion}`);

// Build the package (make sure this matches your build script)
log("Building package...");
execSync("npm run build", {stdio: "inherit"});

// Publish to npm
log("Publishing to npm...");
execSync("npm publish --access public", {stdio: "inherit"});

log(`✅ Release complete! Version: ${nextVersion}`);
