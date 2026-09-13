import { NextResponse } from 'next/server';


export async function GET() {
  const backendUrl = process.env.INTERNAL_VENDURE_URL || 'http://127.0.0.1:3002';

  let vendureAdminStatus = 'unknown';
  let vendureAdminHtml = false;
  let vendureAdminError: string | null = null;

  try {
    const res = await fetch(`${backendUrl}/admin`, { signal: AbortSignal.timeout(4000) });
    vendureAdminStatus = `HTTP ${res.status} ${res.statusText}`;
    const text = await res.text();
    vendureAdminHtml = text.includes('<base href="/admin/"') || text.includes('vendure');
  } catch (err: any) {
    vendureAdminStatus = 'CONNECTION_FAILED';
    vendureAdminError = err.cause ? `${err.message} (${err.cause.code || err.cause})` : err.message;
  }

  let shopApiStatus = 'unknown';
  let shopApiError: string | null = null;
  try {
    const res = await fetch(`${backendUrl}/shop-api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ activeChannel { id token } }' }),
      signal: AbortSignal.timeout(4000)
    });
    shopApiStatus = `HTTP ${res.status} ${res.statusText}`;
  } catch (err: any) {
    shopApiStatus = 'CONNECTION_FAILED';
    shopApiError = err.cause ? `${err.message} (${err.cause.code || err.cause})` : err.message;
  }

  let autoSpawnAttempt = 'none';
  if (vendureAdminStatus === 'CONNECTION_FAILED' && !process.env.VENDURE_SPAWNED_BY_DIAGNOSTIC) {
    try {
      const fs = require('fs');
      const path = require('path');
      const { spawn } = require('child_process');

      const distPath = [
        path.resolve(process.cwd(), 'dist', 'index.js'),
        path.resolve(process.cwd(), '..', 'dist', 'index.js'),
      ].find((p: string) => fs.existsSync(p));

      if (distPath) {
        process.env.VENDURE_SPAWNED_BY_DIAGNOSTIC = 'true';
        const backendRoot = path.dirname(path.dirname(distPath));
        const internalPort = process.env.INTERNAL_VENDURE_PORT || '3002';
        
        try {
          require('dotenv').config({ path: path.join(backendRoot, '.env') });
        } catch (e) {}

        const backend = spawn(process.execPath, [distPath], {
          cwd: backendRoot,
          env: {
            ...process.env,
            PORT: internalPort,
            VENDURE_PORT: internalPort,
          },
          detached: true,
          stdio: 'ignore',
        });
        backend.unref();
        autoSpawnAttempt = `Triggered background spawn of ${distPath} on port ${internalPort}`;
      } else {
        autoSpawnAttempt = 'dist/index.js not found';
      }
    } catch (err: any) {
      autoSpawnAttempt = `Spawn error: ${err.message}`;
    }
  }

  const readLog = (filename: string) => {
    try {
      const p = require('path').join(process.cwd(), filename);
      if (require('fs').existsSync(p)) {
        return require('fs').readFileSync(p, 'utf8').slice(-1500);
      }
      return 'File does not exist';
    } catch (e: any) {
      return e.message;
    }
  };

  return NextResponse.json({
    status: vendureAdminHtml ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      uptimeSeconds: Math.round(process.uptime()),
      cwd: process.cwd(),
      argv: process.argv,
      execPath: process.execPath,
      distIndexExists: require('fs').existsSync(require('path').resolve(process.cwd(), '..', 'dist', 'index.js')) || require('fs').existsSync(require('path').resolve(process.cwd(), 'dist', 'index.js')),
    },
    logs: {
      stderrTail: readLog('stderr.log'),
      consoleTail: readLog('console.log'),
      autoSpawnAttempt,
    },
    configuration: {
      port: process.env.PORT || 'not set (default 3000)',
      internalVendureUrl: backendUrl,
      databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
      cloudinaryConfigured: Boolean(process.env.CLOUD_NAME && process.env.CLOUD_API_KEY),
    },
    checks: {
      vendureAdminUI: {
        endpoint: `${backendUrl}/admin`,
        status: vendureAdminStatus,
        servesHtml: vendureAdminHtml,
        error: vendureAdminError,
      },
      vendureShopApi: {
        endpoint: `${backendUrl}/shop-api`,
        status: shopApiStatus,
        error: shopApiError,
      },
    },
  });
}
