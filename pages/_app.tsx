import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ThemeProvider} from '../contexts/ThemeProvider';
import {AuthProvider} from '../contexts/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Component} from 'react';
import Head from 'next/head';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Mundo do Código</title>
            </Head>
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
