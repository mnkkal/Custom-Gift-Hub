/**
 * Custom Gift Hub - Unified Single Process Runner for Hostinger Web App
 * Runs both Vendure Backend + Admin Panel and Next.js Storefront concurrently under 1 Node.js slot!
 */
const path = require('path');
const fs = require('fs');

// Load environment variables from .env if present
try {
    require('dotenv').config({ path: path.join(__dirname, '.env') });
} catch (e) {
    // dotenv optional if env vars are provided by host
}

const { spawn } = require('child_process');

const hostingerPort = process.env.PORT || '3000';
const internalVendurePort = process.env.INTERNAL_VENDURE_PORT || '3002';

console.log('================================================================');
console.log('>>> Starting Custom Gift Hub - Unified Hostinger Production Runner');
console.log('>>> Node Binary: ' + process.execPath);
console.log('>>> Hostinger Web Port (Next.js Storefront): ' + hostingerPort);
console.log('>>> Internal Vendure Backend Port: ' + internalVendurePort);
console.log('>>> Database URL: ' + (process.env.DATABASE_URL ? 'Configured (Supabase)' : 'NOT SET! Check .env'));
console.log('================================================================');

// Check compiled backend existence
const distIndex = path.join(__dirname, 'dist', 'index.js');
if (!fs.existsSync(distIndex)) {
    console.error('>>> [CRITICAL] dist/index.js NOT FOUND at ' + distIndex);
    console.error('>>> The compiled Vendure backend is missing. Please run "npm run build:backend" or pull the latest git commit containing dist/.');
}

// 1. Start Vendure Backend Process (dist/index.js)
console.log('>>> Launching Vendure Backend on internal port ' + internalVendurePort + '...');
const backend = spawn(process.execPath, [distIndex], {
    cwd: __dirname,
    env: {
        ...process.env,
        PORT: internalVendurePort,
        VENDURE_PORT: internalVendurePort,
    },
    stdio: 'inherit',
});

backend.on('error', (err) => {
    console.error('>>> [Vendure] Failed to spawn backend process:', err);
});

backend.on('exit', (code, signal) => {
    console.error(`>>> [Vendure] Backend process exited (code: ${code}, signal: ${signal})`);
});

// 2. Start Next.js Storefront Process (storefront/server.js)
console.log('>>> Launching Next.js Storefront on public port ' + hostingerPort + '...');
const storefrontServer = path.join(__dirname, 'storefront', 'server.js');
const storefront = spawn(process.execPath, [storefrontServer], {
    cwd: path.join(__dirname, 'storefront'),
    env: {
        ...process.env,
        PORT: hostingerPort,
        INTERNAL_VENDURE_URL: 'http://127.0.0.1:' + internalVendurePort,
        VENDURE_SHOP_API_URL: 'http://127.0.0.1:' + internalVendurePort + '/shop-api',
        NEXT_PUBLIC_VENDURE_SHOP_API_URL: '/shop-api',
        VENDURE_STARTED: 'true',
    },
    stdio: 'inherit',
});

storefront.on('error', (err) => {
    console.error('>>> [Storefront] Failed to spawn Next.js process:', err);
});

storefront.on('exit', (code, signal) => {
    console.error(`>>> [Storefront] Next.js process exited (code: ${code}, signal: ${signal})`);
});

// Handle graceful shutdown
function shutdown() {
    console.log('Stopping all unified services...');
    try { backend.kill(); } catch (e) {}
    try { storefront.kill(); } catch (e) {}
    process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
