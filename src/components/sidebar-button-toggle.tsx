'use client';

import { SidebarToggleContext } from '@/context/provider';
import { useContext } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';

const SidebarButtonToggle = () => {
    const { toggleSidebar } = useContext(SidebarToggleContext);

    return (
        <button onClick={toggleSidebar} className="ml-[22px] pr-3 h-full">
            <RiMenu2Fill fontSize={20} />
        </button>
    );
};

export default SidebarButtonToggle;
