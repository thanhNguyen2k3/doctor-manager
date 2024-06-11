import { User } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconType } from 'react-icons';
import { GoChevronDown } from 'react-icons/go';
import { PiDotOutlineFill } from 'react-icons/pi';

type Props = {
    label: string;
    items: any[];
    type: string;
    icon: IconType;
    sidebarOpen: boolean;
    setToggleSidebar: Dispatch<SetStateAction<boolean>>;
    userData: User;
    to?: string;
};

const MenuItem = ({ label, to, items, type, icon: Icon, sidebarOpen, setToggleSidebar, userData }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        setToggleSidebar(true);
    };

    if (type === 'link') {
        return (
            <Link
                href={to!}
                className={`flex w-full ${
                    !sidebarOpen && `justify-center`
                } items-center gap-x-2 px-3 py-[10px] hover:bg-sidebar-active rounded`}
                onClick={() => setToggleSidebar(false)}
            >
                <Icon fontSize={24} />
                {sidebarOpen && <span>{label}</span>}
            </Link>
        );
    }

    if (type === 'button') {
        return (
            <div>
                <button
                    // href={'/dashboard'}
                    onClick={toggle}
                    className={`${
                        !sidebarOpen && 'justify-center'
                    } flex w-full items-center gap-x-2 px-3 h-[42px] hover:bg-sidebar-active rounded`}
                >
                    <Icon fontSize={24} />
                    {sidebarOpen && <span>{label}</span>}
                    {sidebarOpen && <GoChevronDown className={`ml-auto ${isOpen && '-rotate-90'} transition-all`} />}
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ height: 'auto', opacity: 1 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-6 overflow-hidden rounded"
                        >
                            {items.map((item: any) => {
                                if (item.isSecurity && (userData.role === 'admin' || userData.role === 'manager')) {
                                    return (
                                        <li key={item.id} className="pl-2 hover:bg-sidebar-active py-1.5">
                                            <Link
                                                className="flex gap-x-1 items-center"
                                                onClick={() => setToggleSidebar(false)}
                                                href={item.to}
                                            >
                                                <span>
                                                    <PiDotOutlineFill fontSize={20} />
                                                </span>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                } else if (!item.isSecurity && (userData.role === 'doctor' || 'staff')) {
                                    return (
                                        <li key={item.id} className="pl-2 hover:bg-sidebar-active py-1.5">
                                            <Link
                                                className="flex gap-x-1 items-center"
                                                onClick={() => setToggleSidebar(false)}
                                                href={item.to}
                                            >
                                                <span>
                                                    <PiDotOutlineFill fontSize={20} />
                                                </span>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                            })}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        );
    }
};

export default MenuItem;
