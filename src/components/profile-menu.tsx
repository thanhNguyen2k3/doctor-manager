'use client';

import { useActionState } from 'react';
import Avatar from './avatar';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { PiSignOut } from 'react-icons/pi';
import { logout } from '@/app/actions/auth';
import Tippy from '@tippyjs/react/headless';
import { User } from '@prisma/client';

type Props = {
    user: User;
};

const ProfileMenu = ({ user }: Props) => {
    const [_state, action] = useActionState(logout, undefined);

    return (
        <div>
            <Tippy
                arrow={true}
                offset={[0, 10]}
                placement="bottom-start"
                interactive
                render={(attrs) => (
                    <div {...attrs}>
                        <div className="shadow-[0_.25rem_.625rem_rgba(20,20,20,.1)] bg-white rounded overflow-hidden">
                            <div className="p-4 border-b text-center w-menu flex flex-col items-center">
                                <Avatar
                                    width={72}
                                    height={72}
                                    alt="Avatar"
                                    src={user.image ? `/uploads/${user.image}` : '/doctor.png'}
                                />
                                <h1 className="text-lg">{user.first_name}</h1>
                                <p className="text-xs">{user.role}</p>
                            </div>
                            <Link
                                href={'/dashboard'}
                                className="flex items-center gap-x-1.5 text-[13px] p-[10px] hover:text-primary hover:bg-primary-001 border-b border-form-solid"
                            >
                                <FaUser />
                                <span>Trang cá nhân</span>
                            </Link>

                            <form
                                action={action}
                                className="flex cursor-pointer items-center gap-x-1.5 text-[13px] p-[10px] hover:text-primary hover:bg-primary-001 border-b border-form-solid"
                            >
                                <PiSignOut />
                                <button type="submit">Đăng xuất</button>
                            </form>
                        </div>
                    </div>
                )}
            >
                <div className="flex items-center gap-x-1.5 mr-4 pl-2 cursor-pointer">
                    <Avatar
                        src={user.image ? `/uploads/${user.image}` : '/doctor.png'}
                        width={32}
                        height={32}
                        alt="Avatar"
                    />
                    <div className="leading-4">
                        <h2 className="font-medium">{user.first_name}</h2>
                        <p className="text-[11px]">{user.role}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default ProfileMenu;
