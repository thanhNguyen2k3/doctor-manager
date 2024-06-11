import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
    const authenticated = await auth();

    console.log(authenticated);

    if (!authenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/:path*'],
};
