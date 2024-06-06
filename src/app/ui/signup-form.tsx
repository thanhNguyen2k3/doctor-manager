'use client';

import Button from '@/components/button';
import FormControl from '@/components/form-control';
import InputField from '@/components/input-field';
import Link from 'next/link';
import { useActionState } from 'react';
import { signup } from '../actions/auth';

const SignupForm = () => {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <form className="space-y-3" action={action}>
            <h1 className="text-primary text-[28px]">Xin chào</h1>
            <p className="font-medium">Vui lòng đăng ký với Xino</p>

            <FormControl label="Họ">
                <InputField id="first_name" name="first_name" type="text" placeholder="Họ của bạn" />
                {state?.errors?.first_name && (
                    <p className="mt-1 text-font-primary text-red-500">{state?.errors?.first_name}</p>
                )}
            </FormControl>
            <FormControl label="Tên">
                <InputField id="last_name" name="last_name" type="text" placeholder="Tên của bạn" />
                {state?.errors?.last_name && (
                    <p className="mt-1 text-font-primary text-red-500">{state?.errors?.last_name}</p>
                )}
            </FormControl>

            <FormControl label="Email">
                <InputField id="email" name="email" type="email" placeholder="Nhập email của bạn" />
                {state?.errors?.email && <p className="mt-1 text-font-primary text-red-500">{state?.errors?.email}</p>}
            </FormControl>

            <FormControl label="Mật khẩu">
                <InputField id="password" name="password" type="password" placeholder="Nhập mật khẩu của bạn" />
                {state?.errors?.password && (
                    <p className="mt-1 text-font-primary text-red-500">{state?.errors?.password}</p>
                )}
            </FormControl>

            <Button aria-disabled={pending} type="submit" variant={pending ? 'pending' : 'primary'}>
                {pending ? 'Đang xử lý' : 'Đăng ký'}
            </Button>

            <div className="text-sm">
                <p>
                    <span>Bạn đã có tài khoản? </span>
                    <Link href={'/login'} className="font-bold">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignupForm;
