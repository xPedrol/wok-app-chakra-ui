import {createContext} from 'react';
import {ThemeContextType} from '../types/ThemeContext.type';
import {ChakraProvider, cookieStorageManager, localStorageManager} from '@chakra-ui/react';
import {lightTheme} from '../config/theme';

const ThemeContext = createContext({} as ThemeContextType);
export const ThemeProvider = ({children, cookies}: any) => {
    const theme = lightTheme;
    // const colorModeManager = cookieStorageManager(
    //     typeof cookies === 'string'
    //         ? cookies
    //         : typeof document !== 'undefined'
    //             ? document.cookie
    //             : ''
    // );
    const colorModeManager =
        typeof cookies === 'string'
            ? cookieStorageManager(cookies)
            : localStorageManager;


    return (
        <ThemeContext.Provider value={{theme, colorModeManager}}>
            <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
                {children}
            </ChakraProvider>
        </ThemeContext.Provider>
    );
};
