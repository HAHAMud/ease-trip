import { headers } from "next/headers";
import { NextRequest as _NextRequest, NextResponse } from "next/server";

export type Middleware = [(req: NextRequest) => boolean, (res: NextRequest) => NextResponse | null]

export type NextRequest = _NextRequest

export const middlewareController = {
  next: (req?: ResponseInit) => NextResponse.next(req),
  redirect: (url: URL | string) => NextResponse.redirect(url),
  rewrite: (url: URL | string) => NextResponse.redirect(url),
  get headers() {
    return headers()
  }
}
