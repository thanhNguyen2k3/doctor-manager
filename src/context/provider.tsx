'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface ToggleSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type Props = {
    children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>({
    isDarkMode: false,
    toggleTheme: () => {},
});

export const SidebarToggleContext = createContext<ToggleSidebarProps>({
    isOpen: true,
    toggleSidebar: () => {},
    setIsOpen: () => true,
});

const Provider = ({ children }: Props) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showChild, setShowChild] = useState<boolean>(false);

    // Check pathname with role

    useEffect(() => {
        setShowChild(true);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <SidebarToggleContext.Provider value={{ isOpen, toggleSidebar, setIsOpen }}>
                <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
            </SidebarToggleContext.Provider>
        );
    }
};

export default Provider;
