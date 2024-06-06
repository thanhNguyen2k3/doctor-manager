'use client';

import Tippy from '@tippyjs/react/headless';
import { ReactElement } from 'react';
import Avatar from './avatar';
import Link from 'next/link';

type Props = {
    children: ReactElement;
};

const MessageBox = ({ children }: Props) => {
    return (
        <Tippy
            arrow={true}
            offset={[0, 20]}
            placement="bottom-start"
            interactive
            render={(attrs) => (
                <div {...attrs}>
                    <div className="shadow-[0_.25rem_.625rem_rgba(20,20,20,.1)] rounded overflow-hidden">
                        <div className="p-4 bg-background-page text-white w-menu-box">
                            <h1 className="text-[17px]">5 Tin nhắn mới</h1>
                        </div>
                        <Link href={'/dashboard'} className="flex gap-x-2 items-center relative p-[11px]">
                            <time className="absolute right-1 text-[11px] top-1 text-disabled">10 phút trước</time>
                            <Avatar width={48} height={48} src="/avatar.jpg" alt="avatar" />
                            <div>
                                <h2 className="font-semibold">Black Jack</h2>
                                <p className="text-xs text-disabled">Hello anh bạn nhỏ ...</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default MessageBox;
