import NextAuth from 'next-auth';
import { authConfig } from '../../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from './db';
import bcryptjs from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';

async function getUser(email: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.name = token.name;
                session.user.image = token.picture!;
                session.user.email = token.email!;
            }
            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findUnique({
                where: {
                    email: token.email!,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            });

            if (!dbUser) {
                token.id = user!.id!;
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                image: dbUser.image,
                picture: dbUser.image,
            };
        },
        redirect() {
            return `${process.env.NEXT_URL}/login`;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await bcryptjs.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
