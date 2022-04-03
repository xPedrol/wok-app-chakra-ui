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
import {getCourseStatistics} from '../services/CourseService';
import {useAuthContext} from '../contexts/AuthContext';
import {CourseStatisticsType} from '../types/CourseStatistics.type';
import {CourseType} from '../types/Course.type';
import {AiFillWarning} from 'react-icons/ai';

type pageProps = {
    course: CourseType
}
export default function CourseCard({course}: pageProps) {
    const auth = useAuthContext();
    const {data} = useQuery(`course${course.id}Statistics`, () => {
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
                <Button size="sm" colorScheme="blue">
                    Configurações
                </Button>
                <Button size="sm" colorScheme="blue">
                    Classroom
                </Button>
            </Stack>
        </Box>
    );
}
