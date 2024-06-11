'use client';

import DarkMode from '@/components/dark-mode';
import MessageBox from '@/components/message-box';
import ProfileMenu from '@/components/profile-menu';
import Search from '@/components/search';
import SidebarButtonToggle from '@/components/sidebar-button-toggle';
import { User } from '@prisma/client';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { IoMailOutline, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { security } from '../actions/security';
import { useEffect } from 'react';

type Props = {
    data: User;
};

const HeaderDashboard = ({ data }: Props) => {
    const pathname = usePathname();
    const params = useParams();

    security(data.role!, pathname!, params.id!);

    return (
        <div className="h-header bg-white z-50 sticky top-0 right-0 left-0 shadow drop-shadow-sm shadow-primary">
            <div className="flex items-center h-full">
                <SidebarButtonToggle />
                <div className="flex justify-between flex-1 pr-4 items-center">
                    <Search />

                    <div className="flex items-center h-full w-full justify-end">
                        <DarkMode />

                        <MessageBox>
                            <button className="h-full relative px-2.5">
                                <IoMailOutline fontSize={20} className="w-7" />
                                <span className="absolute w-[7px] h-[7px] bg-hot -top-1 right-2 rounded-full"></span>
                            </button>
                        </MessageBox>
                        <button className="h-full px-2.5">
                            <IoNotificationsOutline fontSize={20} className="w-7" />
                        </button>

                        <ProfileMenu user={data} />

                        <button>
                            <IoSettingsOutline fontSize={20} className="animate-spin" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDashboard;
