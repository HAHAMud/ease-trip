import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { middlewares } from './middlewares';
import { cond } from './middlewares/utils';

const getResponse = cond(middlewares);

export function middleware(request: NextRequest) {
  return getResponse(request) ?? NextResponse.next();
}
