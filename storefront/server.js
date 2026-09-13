const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Auto-spawn Vendure Backend if not already running under unified runner
if (!process.env.VENDURE_STARTED) {
  process.env.VENDURE_STARTED = 'true';
  const internalPort = process.env.INTERNAL_VENDURE_PORT || '3002';
  
  const candidates = [
    path.resolve(__dirname, '..', 'dist', 'index.js'),
    path.resolve(__dirname, 'dist', 'index.js'),
    path.resolve(process.cwd(), '..', 'dist', 'index.js'),
    path.resolve(process.cwd(), 'dist', 'index.js'),
  ];
  
  const backendScript = candidates.find(c => fs.existsSync(c));
  if (backendScript) {
    const backendCwd = path.dirname(path.dirname(backendScript));
    console.log('================================================================');
    console.log('>>> [Storefront Server] Auto-starting Vendure Backend...');
    console.log('>>> Backend Script: ' + backendScript);
    console.log('>>> Backend Root: ' + backendCwd);
    console.log('>>> Internal Port: ' + internalPort);
    console.log('================================================================');

    // Load .env from backend root if present
    try {
      require('dotenv').config({ path: path.join(backendCwd, '.env') });
    } catch (e) {}

    const backend = spawn(process.execPath, [backendScript], {
      cwd: backendCwd,
      env: {
        ...process.env,
        PORT: internalPort,
        VENDURE_PORT: internalPort,
      },
      stdio: 'inherit',
    });

    backend.on('error', (err) => console.error('>>> [Vendure] Spawn error:', err));
    backend.on('exit', (code, sig) => console.error(`>>> [Vendure] Process exited: code ${code}, sig ${sig}`));
  } else {
    console.warn('>>> [Storefront Server] Vendure backend script not found in candidates:', candidates);
  }
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log('> Custom Gift Hub Storefront listening on port ' + port + ' (http://' + hostname + ':' + port + ')');
    });
});
