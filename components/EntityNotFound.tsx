import {Box, Heading, Text} from '@chakra-ui/react';
import {WarningTwoIcon} from '@chakra-ui/icons';

type pageProps = {
    message: string
}
export default function EntityNotFound({message}: pageProps) {
    return (
        <>
            <Box textAlign="center" py={3} px={3}>
                <WarningTwoIcon boxSize={'50px'} color={'orange.300'}/>
                <Heading as="h2" size="md" mt={6} mb={2}>
                    Sem resultados
                </Heading>
                <Text color={'gray.500'} maxW={{md: 'md'}} mx={'auto'}>
                    {message}
                </Text>
            </Box>
        </>
    );
}
