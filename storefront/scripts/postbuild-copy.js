/**
 * Postbuild script for Next.js standalone on Hostinger
 * Ensures compiled Vendure backend and its complete modules are packaged into .next/standalone
 */
const fs = require('fs');
const path = require('path');

const logLines = [];
function log(...args) {
  const line = args.join(' ');
  console.log(line);
  logLines.push(line);
}

// Check all possible standalone directory locations (root or monorepo subfolder)
const candidateStandaloneDirs = [
  path.join(__dirname, '..', '.next', 'standalone', 'storefront'),
  path.join(__dirname, '..', '.next', 'standalone'),
  path.join(__dirname, '..', '..', '.next', 'standalone'),
];

const standaloneDirs = candidateStandaloneDirs.filter(d => fs.existsSync(d) && (fs.existsSync(path.join(d, 'server.js')) || fs.existsSync(path.join(d, 'package.json'))));

if (standaloneDirs.length === 0) {
  // Fall back to default location
  const defaultDir = path.join(__dirname, '..', '.next', 'standalone');
  if (fs.existsSync(defaultDir)) {
    standaloneDirs.push(defaultDir);
  } else {
    log('>>> [Postbuild] No standalone directory found, skipping.');
    process.exit(0);
  }
}

log('>>> [Postbuild] Packaging Vendure backend for standalone dirs:', standaloneDirs.join(', '));

// 1. Locate dist
const sourceDist = [
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', '..', 'dist'),
].find(p => fs.existsSync(p));

// 2. Candidate node_modules sources
const candidateModuleSources = [
  path.join(__dirname, '..', 'node_modules'),
  path.join(__dirname, '..', '..', 'node_modules'),
].filter(p => fs.existsSync(p));

log('>>> [Postbuild] Source dist:', sourceDist || 'none');
log('>>> [Postbuild] Source node_modules:', candidateModuleSources.join(', '));

// Packages that must always be complete
const fullOverwrite = new Set([
  '@vendure',
  '@nestjs',
  'nanoid',
  'rxjs',
  'typeorm',
  'pg',
  'pg-cloudflare',
  'pg-connection-string',
  'pg-int8',
  'pg-numeric',
  'pg-pool',
  'pg-protocol',
  'pg-types',
  'pgpass',
  'cloudinary',
  'class-validator',
  'class-transformer',
  'reflect-metadata',
  'dotenv',
  'graphql',
  'graphql-tag'
]);

for (const standaloneDir of standaloneDirs) {
  // A. Copy dist
  if (sourceDist) {
    const targetDist = path.join(standaloneDir, 'dist');
    fs.cpSync(sourceDist, targetDist, { recursive: true, force: true });
    log('>>> [Postbuild] Copied dist to:', targetDist);
  }

  // B. Sync node_modules
  const standaloneModules = path.join(standaloneDir, 'node_modules');
  if (!fs.existsSync(standaloneModules)) {
    fs.mkdirSync(standaloneModules, { recursive: true });
  }

  let copiedCount = 0;
  for (const srcModules of candidateModuleSources) {
    try {
      const items = fs.readdirSync(srcModules);
      for (const item of items) {
        if (item === '.bin' || item === '.cache') continue;
        const srcPkg = path.join(srcModules, item);
        const targetPkg = path.join(standaloneModules, item);
        const shouldOverwrite = fullOverwrite.has(item);

        if (!fs.existsSync(targetPkg) || shouldOverwrite) {
          try {
            fs.cpSync(srcPkg, targetPkg, { recursive: true, force: true });
            copiedCount++;
          } catch (e) {}
        }
      }
    } catch (e) {
      log('>>> [Postbuild] Error reading', srcModules, e.message);
    }
  }
  log('>>> [Postbuild] Synced modules into', standaloneModules, 'count copied:', copiedCount);

  // C. Create start-vendure.js with emergency self-heal
  const startVendureCode = `
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

if (!process.env.VENDURE_STARTED) {
  process.env.VENDURE_STARTED = 'true';
  const internalPort = process.env.INTERNAL_VENDURE_PORT || '3002';
  const distIndex = path.join(__dirname, 'dist', 'index.js');
  const modulesDir = path.join(__dirname, 'node_modules');

  if (fs.existsSync(distIndex)) {
    console.log('================================================================');
    console.log('>>> [Standalone Server] Auto-starting Vendure Backend on port ' + internalPort + '...');
    console.log('>>> Dist script: ' + distIndex);
    console.log('================================================================');

    try {
      require('dotenv').config({ path: path.join(__dirname, '.env') });
    } catch (e) {}

    // Self-heal: ensure @vendure/core is present before booting
    const vendureCoreEntry = path.join(modulesDir, '@vendure', 'core');
    if (!fs.existsSync(vendureCoreEntry)) {
      console.warn('>>> [Standalone Server] @vendure/core not found in ' + modulesDir + '! Performing emergency install...');
      try {
        const { execSync } = require('child_process');
        execSync('npm install --no-audit --no-fund @vendure/core@3.7.0 @vendure/admin-ui-plugin@3.7.0 pg typeorm cloudinary dotenv reflect-metadata class-validator nanoid', {
          cwd: __dirname,
          stdio: 'inherit',
          timeout: 180000
        });
        console.log('>>> [Standalone Server] Emergency install finished successfully!');
      } catch (err) {
        console.error('>>> [Standalone Server] Emergency install error:', err.message);
      }
    }

    const backend = spawn(process.execPath, [distIndex], {
      cwd: __dirname,
      env: {
        ...process.env,
        PORT: internalPort,
        VENDURE_PORT: internalPort,
        NODE_PATH: modulesDir,
      },
      stdio: 'inherit',
    });

    backend.on('error', (err) => console.error('>>> [Vendure] Spawn error:', err));
    backend.on('exit', (code, sig) => console.error('>>> [Vendure] Process exited: code ' + code + ', sig ' + sig));
  } else {
    console.error('>>> [Standalone Server] dist/index.js not found at ' + distIndex);
  }
}
`;

  fs.writeFileSync(path.join(standaloneDir, 'start-vendure.js'), startVendureCode.trim());
  log('>>> [Postbuild] Created start-vendure.js in', standaloneDir);

  // D. Inject into server.js
  const standaloneServerJs = path.join(standaloneDir, 'server.js');
  if (fs.existsSync(standaloneServerJs)) {
    let content = fs.readFileSync(standaloneServerJs, 'utf8');
    if (!content.includes('start-vendure.js')) {
      content = "require('./start-vendure.js');\n" + content;
      fs.writeFileSync(standaloneServerJs, content, 'utf8');
      log('>>> [Postbuild] Injected Vendure auto-spawner into', standaloneServerJs);
    }
  }

  // E. Write postbuild.log
  try {
    fs.writeFileSync(path.join(standaloneDir, 'postbuild.log'), logLines.join('\n'));
  } catch (e) {}
}

log('>>> [Postbuild] Standalone backend packaging complete!');
