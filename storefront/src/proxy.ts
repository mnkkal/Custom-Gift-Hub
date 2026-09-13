import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './platform/i18n/routing';

const middleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Do not apply internationalization rewrites to Vendure Admin UI or GraphQL APIs
    if (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/admin-api') ||
        pathname.startsWith('/shop-api')
    ) {
        return NextResponse.next();
    }

    return middleware(request);
}

export const config = {
    matcher: ['/((?!api|admin|admin-api|shop-api|_next|_vercel|.*\\..*).*)'],
};
