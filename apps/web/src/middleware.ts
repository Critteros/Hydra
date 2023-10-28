import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { debug } from 'debug';

import { isAuthorized } from '@/lib/server/auth';

const log = debug('web:middleware');

export async function middleware(request: NextRequest) {
  const authorized = await isAuthorized(request);
  log(`request to ${request.nextUrl.pathname} authorized=${authorized}`);
  if (!authorized) {
    log(`redirecting to /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico)[^.]*)',
};
