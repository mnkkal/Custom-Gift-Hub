import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/site/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {

    output: 'standalone',
    cacheComponents: true,
    // Vendure's Admin UI canonical URL ends with a slash. Without this,
    // Next.js redirects /admin/ to /admin while Vendure redirects /admin back
    // to /admin/, creating an infinite redirect loop behind the proxy.
    skipTrailingSlashRedirect: true,

    images: {
        // Allow SVG images
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        // This is necessary to display images from your local Vendure instance
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                hostname: 'readonlydemo.vendure.io',
            },
            {
                hostname: 'demo.vendure.io'
            },
            {
                hostname: 'localhost'
            },
            {
                hostname: 'res.cloudinary.com'
            }
        ],
    },
    async rewrites() {
        const backendUrl = process.env.INTERNAL_VENDURE_URL || 'http://127.0.0.1:3002';
        return [
            {
                source: '/admin',
                destination: `${backendUrl}/admin/`,
            },
            {
                source: '/admin/:path*',
                destination: `${backendUrl}/admin/:path*`,
            },
            {
                source: '/admin-api',
                destination: `${backendUrl}/admin-api`,
            },
            {
                source: '/admin-api/:path*',
                destination: `${backendUrl}/admin-api/:path*`,
            },
            {
                source: '/shop-api',
                destination: `${backendUrl}/shop-api`,
            },
            {
                source: '/shop-api/:path*',
                destination: `${backendUrl}/shop-api/:path*`,
            },
        ];
    },
};


export default withNextIntl(nextConfig);
