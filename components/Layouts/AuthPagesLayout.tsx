import {Flex, useColorModeValue} from '@chakra-ui/react';
import Head from 'next/head';

type AuthPagesLayout = {
    children:any;
    title:string;
}

export default function AuthPagesLayout({children, title}: AuthPagesLayout) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'} mx={8}>
                {children}
            </Flex>
        </>
    );
}
