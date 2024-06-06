'use server';

import { signIn, signOut } from '@/lib/auth';
import { db } from '@/lib/db';
import { FormState, signupSchema } from '@/lib/definitions';
import bcryptjs from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const signup = async (state: FormState, formData: FormData) => {
    const validatedFields = signupSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const isDuplicated = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (isDuplicated) {
        return {
            message: 'Tài khoản đã tồn tại',
        };
    }

    const data = await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    const user = data;

    if (!user) {
        return { message: 'Đã xảy ra lỗi khi tạo tài khoản của bạn.' };
    }

    redirect('/login');
};

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
    try {
        await signIn('credentials', formData).then(() => redirect('/dashboard'));
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Thông tin không hợp lệ..';
                default:
                    return 'Đã xảy ra lỗi.';
            }
        }
        throw error;
    }
};

export const logout = async () => {
    await signOut();
    revalidatePath('/');
    redirect('/login');
};
