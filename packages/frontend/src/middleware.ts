import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside

const guardRoutes = ['/planning'];

export function middleware(request: NextRequest) {
  const authorization = headers().get('Authorization');
  const isMatchRoute = guardRoutes.some((path) => request.nextUrl.pathname.match(path));

  if (isMatchRoute && authorization) {
    return NextResponse.next();
  }

  if (isMatchRoute && authorization === null) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
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
