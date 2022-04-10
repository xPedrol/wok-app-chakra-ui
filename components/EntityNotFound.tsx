import {Box, Heading, Text} from '@chakra-ui/react';
import {WarningTwoIcon} from '@chakra-ui/icons';

type pageProps = {
    message: string
    textSize?:string
    iconSize?:number
    mT?:number | string
}
export default function EntityNotFound({message,textSize,iconSize,mT}: pageProps) {
    textSize = textSize??'md';
    iconSize = iconSize??50;
    mT = mT??0;
    return (
        <>
            <Box textAlign="center" py={3} px={3} mt={mT}>
                <WarningTwoIcon boxSize={iconSize} color={'orange.300'}/>
                <Heading as="h2" size={textSize} mt={2} mb={1}>
                    Sem resultados
                </Heading>
                <Text color={'gray.500'} fontSize={textSize} maxW={{md: 'md'}} mx={'auto'}>
                    {message}
                </Text>
            </Box>
        </>
    );
}
