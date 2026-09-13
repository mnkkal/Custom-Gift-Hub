/**
 * Custom Gift Hub - Unified Single Process Runner for Hostinger Web App
 * Runs both Vendure Backend + Admin Panel and Next.js Storefront concurrently under 1 Node.js slot!
 */
const { spawn } = require('child_process');
const path = require('path');

const hostingerPort = process.env.PORT || '3000';
const internalVendurePort = process.env.INTERNAL_VENDURE_PORT || '3002';

console.log('================================================================');
console.log('>>> Starting Custom Gift Hub - Unified Hostinger Production Runner');
console.log('>>> Hostinger Web Port (Next.js Storefront): ' + hostingerPort);
console.log('>>> Internal Vendure Backend Port: ' + internalVendurePort);
console.log('================================================================');

// 1. Start Vendure Backend Process (dist/index.js)
const backend = spawn('node', ['dist/index.js'], {
    cwd: __dirname,
    env: {
        ...process.env,
        PORT: internalVendurePort,
        VENDURE_PORT: internalVendurePort,
    },
    stdio: 'inherit',
});

backend.on('error', (err) => {
    console.error('Failed to start Vendure backend:', err);
});

// 2. Start Next.js Storefront Process (storefront/server.js)
const storefront = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'storefront'),
    env: {
        ...process.env,
        PORT: hostingerPort,
        INTERNAL_VENDURE_URL: 'http://127.0.0.1:' + internalVendurePort,
        VENDURE_SHOP_API_URL: 'http://127.0.0.1:' + internalVendurePort + '/shop-api',
        NEXT_PUBLIC_VENDURE_SHOP_API_URL: '/shop-api',
    },
    stdio: 'inherit',
});

storefront.on('error', (err) => {
    console.error('Failed to start Next.js storefront:', err);
});

// Handle graceful shutdown
function shutdown() {
    console.log('Stopping all unified services...');
    backend.kill();
    storefront.kill();
    process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
