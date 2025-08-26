// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only protect /backoffice/*
export const config = { matcher: ['/backoffice/:path*'] };

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get('admin_authed')?.value === 'true';
  if (!isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('admin', 'login'); // shows the PIN modal on the homepage
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
