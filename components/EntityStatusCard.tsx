import {EntityStatusCardType} from '../types/EntityStatusCard.type';
import {Stat, StatLabel, StatNumber} from '@chakra-ui/stat';
import {Box, Flex, useColorModeValue} from '@chakra-ui/react';

type pageProps = {
    data: EntityStatusCardType
}

function EntityStatusCard({data}: pageProps) {
    return (
        <>
            <StatsCard
                title={data.title}
                stat={data.stat}
                icon={data.icon}
            />
        </>
    );
}

function StatsCard(props: EntityStatusCardType) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            bgColor={useColorModeValue('gray.600', 'gray.700')}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}
export default EntityStatusCard;
