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

  return NextResponse.json({
    status: vendureAdminHtml ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      uptimeSeconds: Math.round(process.uptime()),
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
