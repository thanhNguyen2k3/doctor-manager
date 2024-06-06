'use client';

import { ThemeContext } from '@/context/provider';
import { useContext } from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';

const DarkMode = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    return (
        <button className="h-full px-2.5" onClick={toggleTheme}>
            {isDarkMode ? (
                <CiLight fontSize={20} className="w-7" />
            ) : (
                <MdOutlineDarkMode fontSize={20} className="w-7" />
            )}
        </button>
    );
};

export default DarkMode;
