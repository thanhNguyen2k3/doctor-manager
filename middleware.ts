import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
    const isAuthenticated = await auth();

    if (isAuthenticated) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/:path*'],
};
