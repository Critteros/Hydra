import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import { env } from '$env';

export const sessionCookieName = 'session';
export const sessionEndpoint = new URL('/api/auth/session', env.BACKEND_BASE_URL).toString();
const publicRoutes = ['/login'];

export function extractSessionCookie() {
  return cookies().get(sessionCookieName)?.value;
}

export async function checkSession(sessionCookie?: string) {
  sessionCookie ??= extractSessionCookie();
  const resp = await fetch(sessionEndpoint, {
    headers: {
      cookie: `${sessionCookieName}=${sessionCookie}`,
    },
    cache: 'no-store',
  });
  return resp.ok;
}

export async function isAuthenticated(request: NextRequest) {
  const sessionCookie = request.cookies.get(sessionCookieName);
  if (!sessionCookie) return false;

  return await checkSession(sessionCookie.value);
}

export async function isAuthorized(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (publicRoutes.includes(pathname)) return true;
  return await isAuthenticated(request);
}
