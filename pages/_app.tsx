import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ThemeProvider} from '../contexts/ThemeProvider';
import {AuthProvider} from '../contexts/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider cookies={pageProps.cookies}>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
