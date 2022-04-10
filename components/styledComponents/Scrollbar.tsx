import {Box, useColorModeValue, useStyleConfig} from '@chakra-ui/react'

function Scrollbar({children,maxH}) {
    const trackColor = useColorModeValue('gray.300', 'gray.700');
    const thumbColor = useColorModeValue('gray.400', 'gray.600');
    const thumbColorHover = useColorModeValue('gray.500', 'gray.500');
    // Pass the computed styles into the `__css` prop
    return <Box  overflowY="auto" maxH={maxH}
                 sx={{
                     '&::-webkit-scrollbar': {
                         width: '6px',
                         height: '8px',
                     },
                     '&::-webkit-scrollbar-track': {
                         background: trackColor,
                         width: '6px'
                     },
                     '&::-webkit-scrollbar-thumb': {
                         background: thumbColor,
                         borderRadius: '10px',
                     },
                     '&::-webkit-scrollbar-thumb:hover': {
                         background: thumbColorHover,
                         borderRadius: '24px',
                     },
                 }}>{children}</Box>
}

export default Scrollbar