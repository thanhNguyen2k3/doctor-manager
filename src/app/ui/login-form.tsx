'use client';

import Button from '@/components/button';
import FormControl from '@/components/form-control';
import InputField from '@/components/input-field';
import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '../actions/auth';

const LoginForm = () => {
    const [message, action, pending] = useActionState(authenticate, undefined);

    return (
        <form className="space-y-3" action={action}>
            <h1 className="text-primary text-[28px]">Xin chào</h1>
            <p className="font-medium">Vui lòng đăng nhập để tiếp tục</p>

            {message && <h3 className="text-red-500 text-sm text-center block">{message}</h3>}

            <FormControl label="Email">
                <InputField id="email" name="email" type="email" placeholder="Nhập email của bạn" />
            </FormControl>
            <FormControl label="Mật khẩu">
                <InputField id="password" name="password" type="password" placeholder="Nhập mật khẩu của bạn" />
            </FormControl>

            <Button aria-disabled={pending} type="submit" variant={pending ? 'pending' : 'primary'}>
                {pending ? 'Đang xử lý' : 'Đăng nhập'}
            </Button>

            <div className="text-sm">
                <Link className="font-bold" href={'/forgot-password'}>
                    Quên mật khẩu?
                </Link>
                <p>
                    <span>Bạn chưa có tài khoản? </span>
                    <Link href={'/signup'} className="font-bold">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
