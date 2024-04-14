import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import cond from 'lodash/cond';
import { middlewares } from './middlewares';

const getResponse = cond(middlewares);

export function middleware(request: NextRequest) {
  return getResponse(request) ?? NextResponse.next();
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
