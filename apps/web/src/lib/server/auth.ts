import type { NextRequest } from 'next/server';

import { env } from '$env';

const sessionCookieName = 'session';
const sessionEndpoint = new URL('/api/auth/session', env.BACKEND_BASE_URL).toString();
const publicRoutes = ['/login'];

export async function isAuthenticated(request: NextRequest) {
  const sessionCookie = request.cookies.get(sessionCookieName);
  if (!sessionCookie) return false;

  const resp = await fetch(sessionEndpoint, {
    headers: {
      cookie: `${sessionCookieName}=${sessionCookie.value}`,
    },
  });

  return resp.ok;
}

export async function isAuthorized(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (publicRoutes.includes(pathname)) return true;
  return await isAuthenticated(request);
}
