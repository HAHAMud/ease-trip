import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { middlewares } from './middlewares';
import { cond } from './middlewares/utils';

const getResponse = cond(middlewares);

export function middleware(request: NextRequest) {
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
