'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { SidebarToggleContext } from '@/context/provider';
import { RiComputerLine } from 'react-icons/ri';
import { FaUser, FaUserDoctor, FaUserInjured } from 'react-icons/fa6';
import { SlEnvolopeLetter } from 'react-icons/sl';
import Drawer from '@mui/material/Drawer';

import { Montserrat } from 'next/font/google';
import MenuItem from './menu-item';
import styled from 'styled-components';
import { User } from '@prisma/client';

const montserrat = Montserrat({ subsets: ['vietnamese'], weight: ['100', '300', '400', '500', '700'] });

const sidebar_menu_items = [
    {
        id: 'menu1',
        type: 'link',
        to: '/dashboard',
        items: [],
        extand: false,
        title: 'Bảng điều khiển',
        icon: RiComputerLine,
        security: ['admin', 'manager'],
    },
    {
        id: 'menu5',
        type: 'button',
        to: null,
        title: 'Cuộc hẹn',
        icon: SlEnvolopeLetter,
        extand: false,
        security: ['admin', 'manager'],
        items: [
            {
                id: 'appointment-item1',
                type: 'link',
                to: '/appointments',
                title: 'Quản lý cuộc hẹn',
                isSecurity: true,
            },
            {
                id: 'appointment-item2',
                type: 'link',
                to: '/appointments/new',
                title: 'Thêm mới',
                isSecurity: true,
            },
        ],
    },
    {
        id: 'menu2',
        type: 'button',
        to: null,
        title: 'Bác sĩ',
        icon: FaUserDoctor,
        extand: false,
        security: ['admin', 'manager'],
        items: [
            {
                id: 'doctor-item1',
                type: 'link',
                to: '/doctors',
                title: 'Quản lý bác sĩ',
                isSecurity: false,
            },
            {
                id: 'doctor-item2',
                type: 'link',
                to: '/doctors/new',
                title: 'Thêm mới',
                isSecurity: true,
            },
        ],
    },
    {
        id: 'menu3',
        type: 'button',
        to: null,
        title: 'Nhân viên',
        icon: FaUser,
        extand: false,
        security: ['admin', 'manager', 'doctor'],
        items: [
            {
                id: 'staff-1',
                type: 'link',
                to: '/staffs',
                title: 'Quản lý nhân viên',
                isSecurity: false,
            },
            {
                id: 'staff-2',
                type: 'link',
                to: '/staffs/new',
                title: 'Thêm mới',
                isSecurity: true,
            },
        ],
    },
    {
        id: 'menu4',
        type: 'button',
        to: null,
        title: 'Bệnh nhân',
        icon: FaUserInjured,
        extand: false,
        security: ['admin', 'manager', 'doctor', 'staff'],
        items: [
            {
                id: 'patient-1',
                type: 'link',
                to: '/patients',
                title: 'Quản lý bệnh nhân',
                isSecurity: false,
            },
            {
                id: 'patient-2',
                type: 'link',
                to: '/patients/new',
                title: 'Thêm mới',
                isSecurity: true,
            },
        ],
    },
];

const StyledDrawer = styled(Drawer)`
    .css-4t3x6l-MuiPaper-root-MuiDrawer-paper {
        width: 240px;
        flex: 1;
        height: 100%;
    }
`;

type Props = {
    userData: User;
};

const SidebarUi = ({ userData }: Props) => {
    const { isOpen, setIsOpen } = useContext(SidebarToggleContext);

    const isAdmin = sidebar_menu_items.filter((menu) => menu.security?.[0] === 'admin');
    const isManager = sidebar_menu_items.filter(
        (menu) => menu.security?.[0] === 'admin' && menu.security?.[1] === 'manager',
    );

    const isDoctor = sidebar_menu_items.filter(
        (menu) => menu.security?.[2] === 'doctor' && menu.security?.[0] === 'admin' && menu.security?.[1] === 'manager',
    );

    const isStaff = sidebar_menu_items.filter(
        (menu) => menu.security?.[2] === 'staff' && menu.security?.[0] === 'admin' && menu.security?.[1] === 'doctor',
    );

    return (
        <div>
            <StyledDrawer open={isOpen} onClose={() => setIsOpen(false)}>
                <motion.div
                    animate={{ width: 240 }}
                    transition={{ duration: 0.2 }}
                    className={`relative px-3 ${montserrat.className}`}
                >
                    <div className="sticky left-0 top-0 bottom-0 right-0">
                        <div className="h-header flex justify-center items-center border-b border-[#ffffff1a]">
                            <Image
                                src={isOpen ? '/heal.png' : '/heal.png'}
                                width={isOpen ? 95 : 32}
                                height={32}
                                alt="Xino"
                            />
                        </div>

                        <div>
                            {isOpen && (
                                <h3 className="flex items-center text-[10px] space-x-1 px-3 py-1">
                                    <span>--</span>
                                    <span>Bảng điều khiển</span>
                                </h3>
                            )}
                            <div>
                                {userData.role === 'admin'
                                    ? isAdmin.map((menu) => {
                                          return (
                                              <MenuItem
                                                  role={menu.security}
                                                  userData={userData}
                                                  key={menu.id}
                                                  sidebarOpen={isOpen}
                                                  icon={menu.icon}
                                                  items={menu.items}
                                                  label={menu.title}
                                                  type={menu.type}
                                                  setToggleSidebar={setIsOpen!}
                                              />
                                          );
                                      })
                                    : userData.role === 'manager'
                                    ? isManager.map((menu) => (
                                          <MenuItem
                                              role={menu.security}
                                              userData={userData}
                                              key={menu.id}
                                              sidebarOpen={isOpen}
                                              icon={menu.icon}
                                              items={menu.items}
                                              label={menu.title}
                                              type={menu.type}
                                              setToggleSidebar={setIsOpen!}
                                          />
                                      ))
                                    : userData.role === 'doctor'
                                    ? isDoctor.map((menu) => {
                                          return (
                                              <MenuItem
                                                  role={menu.security}
                                                  userData={userData}
                                                  key={menu.id}
                                                  sidebarOpen={isOpen}
                                                  icon={menu.icon}
                                                  items={menu.items}
                                                  label={menu.title}
                                                  type={menu.type}
                                                  setToggleSidebar={setIsOpen!}
                                              />
                                          );
                                      })
                                    : isStaff.map((menu) => {
                                          return (
                                              <MenuItem
                                                  role={menu.security}
                                                  userData={userData}
                                                  key={menu.id}
                                                  sidebarOpen={isOpen}
                                                  icon={menu.icon}
                                                  items={menu.items}
                                                  label={menu.title}
                                                  type={menu.type}
                                                  setToggleSidebar={setIsOpen!}
                                              />
                                          );
                                      })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </StyledDrawer>
        </div>
    );
};

export default SidebarUi;
