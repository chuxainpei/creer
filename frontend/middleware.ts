import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { resolveAdminAccess } from '@/src/lib/admin-gate';

const ADMIN_GATE_COOKIE = 'employment_admin_gate';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const decision = resolveAdminAccess({
    cookieValue: request.cookies.get(ADMIN_GATE_COOKIE)?.value ?? null,
    entryToken: request.nextUrl.searchParams.get('entry'),
    configuredToken: process.env.ADMIN_ENTRY_TOKEN,
  });

  if (decision === 'allow') {
    return NextResponse.next();
  }

  if (decision === 'grant') {
    const targetUrl = request.nextUrl.clone();
    targetUrl.searchParams.delete('entry');
    const response = NextResponse.redirect(targetUrl);
    response.cookies.set(ADMIN_GATE_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/admin',
      maxAge: 8 * 60 * 60,
    });
    return response;
  }

  const deniedUrl = request.nextUrl.clone();
  deniedUrl.pathname = '/qa';
  deniedUrl.search = '';
  deniedUrl.searchParams.set('notice', 'admin-protected');
  return NextResponse.redirect(deniedUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
