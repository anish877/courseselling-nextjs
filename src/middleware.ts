import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
    '/',
    '/verify/:path*',
    '/admin/:path*',
    '/all-courses/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect logged-in users away from sign-in, sign-up, or verification pages
  if (
    token &&
    (url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/all-courses', request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (
    !token &&
    (
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/admin') 
      // url.pathname.startsWith('/all-courses')
    )
  ) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Redirect non-admin users away from the admin page
  if (url.pathname.startsWith('/admin')) {
    if (!token?.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
