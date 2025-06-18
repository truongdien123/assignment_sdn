import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (req.nextUrl.pathname.startsWith('/api/products') && req.method !== 'GET') {
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/products/:path*'],
};
