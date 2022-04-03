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
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')} mx={8}>
                {children}
            </Flex>
        </>
    );
}
