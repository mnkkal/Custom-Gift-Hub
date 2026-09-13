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

// 3. Create start-vendure.js inside standalone directory
const startVendureCode = `
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

if (!process.env.VENDURE_STARTED) {
  process.env.VENDURE_STARTED = 'true';
  const internalPort = process.env.INTERNAL_VENDURE_PORT || '3002';
  const distIndex = path.join(__dirname, 'dist', 'index.js');

  if (fs.existsSync(distIndex)) {
    console.log('================================================================');
    console.log('>>> [Standalone Server] Auto-starting Vendure Backend on port ' + internalPort + '...');
    console.log('>>> Dist script: ' + distIndex);
    console.log('================================================================');

    try {
      require('dotenv').config({ path: path.join(__dirname, '.env') });
    } catch (e) {}

    const backend = spawn(process.execPath, [distIndex], {
      cwd: __dirname,
      env: {
        ...process.env,
        PORT: internalPort,
        VENDURE_PORT: internalPort,
      },
      stdio: 'inherit',
    });

    backend.on('error', (err) => console.error('>>> [Vendure] Spawn error:', err));
    backend.on('exit', (code, sig) => console.error(\`>>> [Vendure] Process exited: code \${code}, sig \${sig}\`));
  } else {
    console.error('>>> [Standalone Server] dist/index.js not found at ' + distIndex);
  }
}
`;

fs.writeFileSync(path.join(standaloneDir, 'start-vendure.js'), startVendureCode.trim());

// 4. Prepend require('./start-vendure.js') to standalone server.js
const standaloneServerJs = path.join(standaloneDir, 'server.js');
if (fs.existsSync(standaloneServerJs)) {
  let content = fs.readFileSync(standaloneServerJs, 'utf8');
  if (!content.includes('start-vendure.js')) {
    content = "require('./start-vendure.js');\n" + content;
    fs.writeFileSync(standaloneServerJs, content, 'utf8');
    console.log('>>> [Postbuild] Injected Vendure auto-spawner into standalone server.js');
  }
}

console.log('>>> [Postbuild] Standalone backend packaging complete!');
