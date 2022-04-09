import {Center, Spinner, Text} from '@chakra-ui/react';

type pageProps = {
    message?: string
    showStandardMessage?: boolean;
}
const Loading = ({message, showStandardMessage}: pageProps) => {
    return (
        <>
            <Center mt={7} mb={2}>
                <Spinner/>
                {message && (
                    <Text fontSize={'sm'} m={2}>{message}</Text>
                )}
                {showStandardMessage && !message && (
                    <Text fontSize={'sm'} m={2}>Carregando...</Text>
                )}
            </Center>
        </>
    );
};

export default Loading;
