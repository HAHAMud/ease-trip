import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside

const GUIDE_ROUTES = ['/planning'];

export function middleware(request: NextRequest) {
  const authorization = headers().get('Authorization');

  if (GUIDE_ROUTES.some((path) => request.nextUrl.pathname.match(path)) && authorization) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL('/login', request.url));
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
