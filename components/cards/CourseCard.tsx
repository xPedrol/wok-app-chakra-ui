import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {getCourseStatistics} from '../../services/CourseService';
import {useAuthContext} from '../../contexts/AuthContext';
import {CourseStatisticsType} from '../../types/CourseStatistics.type';
import {CourseType} from '../../types/Course.type';
import {AiFillWarning} from 'react-icons/ai';
import NextLink from 'next/link';
import {AuthorityEnum} from "../../types/user/Authority.type";

type pageProps = {
    course: CourseType
}
const CourseCard = ({course}: pageProps) => {
    const auth = useAuthContext();
    const {data} = useQuery([`courseStatistics`, course.id], () => {
        return getCourseStatistics(auth.getRoutePrefix(), course.id);
    });
    let statistics: CourseStatisticsType | undefined = undefined;
    if (data?.data) {
        statistics = data.data;
    }
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            rounded={'md'}
            p={6}
            py={4}
            overflow={'hidden'}>
            <Stack>
                <Flex mb={5}>
                    <Box>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'xl'}
                            fontFamily={'body'}>
                            {course?.name}
                        </Heading>
                    </Box>
                    {course.isTest() && (
                        <>
                            <Spacer/>
                            <Box>
                                <Tag size={'sm'} variant={'outline'} colorScheme={'orange'}>
                                    <TagLeftIcon boxSize="12px" as={AiFillWarning}/>
                                    <TagLabel>{course.courseType}</TagLabel>
                                </Tag>
                            </Box>
                        </>
                    )}
                </Flex>
                <Text color={'gray.500'}>
                    {course?.description}
                </Text>
            </Stack>
            <Stack direction={'row'} spacing={2} my={3} justify={'flex-start'}>
                <Tag variant={'outline'} colorScheme={'blue'}>Módulos: {course?.modules?.length ?? 0}</Tag>
                <Tag variant={'outline'} colorScheme={'blue'}>Tópicos: {statistics?.amountTopics ?? 0}</Tag>
                <Tag variant={'outline'} colorScheme={'blue'}>Módulos: {statistics?.amountExercises ?? 0}</Tag>
            </Stack>
            <Stack mt={6} direction={'row'} spacing={2} align={'center'} justify={'flex-end'}>
                {auth.user.hasAnyAuthority([AuthorityEnum.ADMIN, AuthorityEnum.TEACHER]) && (
                    <NextLink href={`/manager/course/${course?.slug}`} passHref>
                        <Button as={'a'} size="sm" colorScheme="blue" variant={'outline'}>
                            Configurações
                        </Button>
                    </NextLink>
                )}
                <NextLink href={`/course/${course?.slug}`} passHref>
                    <Button as={'a'} size="sm" colorScheme="blue" variant={'outline'}>
                        Classroom
                    </Button>
                </NextLink>
            </Stack>
        </Box>
    );
};
export default CourseCard;