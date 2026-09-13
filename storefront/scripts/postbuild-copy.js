/**
 * Postbuild script for Next.js standalone on Hostinger
 * Ensures compiled Vendure backend and its modules are copied into .next/standalone
 */
const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.log('>>> [Postbuild] Standalone directory not found, skipping copy.');
  process.exit(0);
}

console.log('>>> [Postbuild] Copying Vendure backend into standalone directory:', standaloneDir);

// 1. Copy dist/
const sourceDist = fs.existsSync(path.join(__dirname, '..', 'dist'))
  ? path.join(__dirname, '..', 'dist')
  : path.join(__dirname, '..', '..', 'dist');

if (fs.existsSync(sourceDist)) {
  const targetDist = path.join(standaloneDir, 'dist');
  fs.cpSync(sourceDist, targetDist, { recursive: true, force: true });
  console.log('>>> [Postbuild] Copied dist to:', targetDist);
} else {
  console.warn('>>> [Postbuild] Source dist not found at:', sourceDist);
}

// 2. Copy backend node_modules into standalone node_modules
const standaloneModules = path.join(standaloneDir, 'node_modules');
if (!fs.existsSync(standaloneModules)) {
  fs.mkdirSync(standaloneModules, { recursive: true });
}

const packagesToCopy = [
  '@vendure',
  'pg',
  'pg-cloudflare',
  'pg-connection-string',
  'pg-int8',
  'pg-numeric',
  'pg-pool',
  'pg-protocol',
  'pg-types',
  'pgpass',
  'typeorm',
  'cloudinary',
  'class-validator',
  'reflect-metadata',
  'dotenv'
];

const moduleSources = [
  path.join(__dirname, '..', '..', 'node_modules'),
  path.join(__dirname, '..', 'node_modules'),
];

for (const pkg of packagesToCopy) {
  for (const srcDir of moduleSources) {
    const pkgPath = path.join(srcDir, pkg);
    if (fs.existsSync(pkgPath)) {
      const targetPkg = path.join(standaloneModules, pkg);
      if (!fs.existsSync(targetPkg)) {
        try {
          fs.cpSync(pkgPath, targetPkg, { recursive: true, force: true });
          console.log(`>>> [Postbuild] Copied ${pkg} to standalone node_modules`);
        } catch (e) {
          console.warn(`>>> [Postbuild] Failed copying ${pkg}:`, e.message);
        }
      }
      break;
    }
  }
}

console.log('>>> [Postbuild] Standalone backend packaging complete!');
