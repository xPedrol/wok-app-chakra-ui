// theme.ts

// 1. import `extendTheme` function
import {extendTheme, type ThemeConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

const typography = {
    fonts: {
        body: 'Roboto,Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
        heading: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
        mono: 'Menlo, monospace',
    },
};

// 2. Add your color mode config
const lightConfig: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: true,
};

const darkConfig: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
};
const colors = {
    colors: {},
    styles: {
        global: (props) => ({
            body: {
                bg: mode('#f7f9fc', 'gray.800')(props)
            },
        })
    }
};
// 3. extend the theme
export const lightTheme = extendTheme({config: lightConfig, ...typography, ...colors});
export const darkTheme = extendTheme({config: darkConfig, ...typography, ...colors});

