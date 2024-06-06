'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { Theme, createTheme } from '@mui/material/styles';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface ToggleSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
});

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

    useEffect(() => {
        setShowChild(true);
    }, []);

    const theme: Theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
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
                <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </ThemeContext.Provider>
            </SidebarToggleContext.Provider>
        );
    }
};

export default Provider;
