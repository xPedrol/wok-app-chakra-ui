import Header from '../Header';
import {Container} from '@chakra-ui/react';
import Head from 'next/head';
import {ReactNode} from 'react';

type PageProps = {
    children: ReactNode;
    title?: string;
}
export default function DefaultLayout({children, title}: PageProps) {
    title = title??'';
    return (
        <>
            <Head>
                <title>{`WOK - ${title}`}</title>
            </Head>
            <Header/>
            <Container maxW="8xl" mt={8} mb={8}>
                {children}
            </Container>
        </>
    );
}
