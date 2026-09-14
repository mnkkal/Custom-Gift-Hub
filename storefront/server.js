const { createServer, request: httpRequest } = require('http');
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
const vendureUrl = new URL(process.env.INTERNAL_VENDURE_URL || 'http://127.0.0.1:3002');

function isVendurePath(pathname) {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/admin-api' ||
    pathname.startsWith('/admin-api/') ||
    pathname === '/shop-api' ||
    pathname.startsWith('/shop-api/')
  );
}

function proxyToVendure(req, res, parsedUrl) {
  // Request Vendure's canonical Admin UI path directly so it does not emit a
  // redirect which can conflict with Next.js trailing-slash normalization.
  const pathname = parsedUrl.pathname === '/admin' ? '/admin/' : parsedUrl.pathname;
  const search = parsedUrl.search || '';
  const proxyReq = httpRequest({
    protocol: vendureUrl.protocol,
    hostname: vendureUrl.hostname,
    port: vendureUrl.port,
    method: req.method,
    path: pathname + search,
    headers: {
      ...req.headers,
      host: vendureUrl.host,
    },
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Vendure proxy error for', req.url, err);
    if (!res.headersSent) {
      res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
    }
    res.end('Vendure backend unavailable');
  });

  req.pipe(proxyReq);
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      if (isVendurePath(parsedUrl.pathname || '/')) {
        proxyToVendure(req, res, parsedUrl);
        return;
      }
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
