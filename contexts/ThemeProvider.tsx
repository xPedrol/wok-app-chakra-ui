import {createContext, useState} from 'react';
import {ThemeContextType} from '../types/ThemeContext.type';
import {ChakraProvider, cookieStorageManager, localStorageManager} from '@chakra-ui/react';
import {lightTheme} from '../config/theme';

const ThemeContext = createContext({} as ThemeContextType);
export const ThemeProvider = ({children, cookies}: any) => {
    const [theme, setTheme] = useState(lightTheme);
    const colorModeManager =
        typeof cookies === 'string'
            ? cookieStorageManager(cookies)
            : localStorageManager;
    const toggleTheme = () => {

    };
    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
                {children}
            </ChakraProvider>
        </ThemeContext.Provider>
    );
};
