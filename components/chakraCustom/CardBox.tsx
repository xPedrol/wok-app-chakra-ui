import {Box, useColorModeValue} from "@chakra-ui/react";

const CardBox = ({children}) => {
    const courseBoxBg = useColorModeValue('white', 'gray.900');
    const courseBoxBorderColor = useColorModeValue('gray.300', 'gray.600');
    return (
        <>
            <Box
                w={'full'}
                bg={courseBoxBg}
                border={'1px solid'}
                borderColor={courseBoxBorderColor}
                rounded={'md'}
                p={6}
                py={4}
                overflow={'hidden'}>
                {children}
            </Box>
        </>
    )
}
export default CardBox