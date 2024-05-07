import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { middlewareHandler } from './middlewares';

export function middleware(request: NextRequest) {
  return middlewareHandler(request) ?? NextResponse.next();
}
