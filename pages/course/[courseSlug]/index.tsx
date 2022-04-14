import {protectedRoute} from '../../../HOC/ProtectedRoute';
import {useRouter} from 'next/router';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {getCourse} from '../../../services/CourseService';
import {useAuthContext} from '../../../contexts/AuthContext';
import {toCourse} from '../../../dataFormatters/CourseFormatter';
import {DATE_CLASSIC_FORMAT} from '../../../dataFormatters/DateFormats';
import NextLink from 'next/link';
import {getUserTanksByCourse} from '../../../services/UserRankService';
import UserRanksTable from '../../../components/tables/UserRanksTable';
import Loading from '../../../components/Loading';
import Scrollbar from "../../../components/styledComponents/Scrollbar";
import {AuthorityEnum} from "../../../types/user/Authority.type";
import UserResultsMatrix from "../../../components/UserResultsMatrix";
import CardBox from "../../../components/chakraCustom/CardBox";

const CoursePage = () => {

    const courseBoxBg = useColorModeValue('white', 'gray.900');
    const courseBoxBorderColor = useColorModeValue('gray.300', 'gray.600');
    const courseHeadingColor = useColorModeValue('gray.700', 'white');
    const courseSubHeadingColor = useColorModeValue('gray.700', 'gray.400');
    const courseModulesHeadingColor = useColorModeValue('gray.700', 'white');

    const router = useRouter();
    const auth = useAuthContext();
    const {courseSlug} = router.query;
    const {data: course} = useQuery('course', () => {
        return getCourse(auth.getRoutePrefix(), courseSlug).then(res => toCourse(res.data));
    });
    const {data: userRanks} = useQuery(['userRanksByCourse', courseSlug], () => {
        return getUserTanksByCourse(course.id).then(res => res.data);
    }, {
        enabled: !!course
    });


    return (
        <>
            <DefaultLayout title={`${course?.name}`}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    <GridItem colSpan={{base: 12, lg: 5}}>
                        {course ? (
                            <Box
                                w={'full'}
                                bg={courseBoxBg}
                                border={'1px solid'}
                                borderColor={courseBoxBorderColor}
                                rounded={'md'}
                                p={6}
                                py={4}
                                overflow={'hidden'}>
                                <Flex mb={5} justifyContent={'space-between'}>
                                    <Box>
                                        <Heading mb={1}
                                                 color={courseHeadingColor}
                                                 fontSize={'md'}
                                                 fontFamily={'heading'}>
                                            {course?.name}
                                        </Heading>
                                        <Text
                                            color={courseSubHeadingColor}
                                            fontSize={'xs'}
                                            fontFamily={'body'}>
                                            {course?.startDate.format(DATE_CLASSIC_FORMAT)} - {course?.endDate.format(DATE_CLASSIC_FORMAT)}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <NextLink href={'/profile/alessio'} passHref>
                                            <a>
                                                <Tooltip label={`Professor do curso: ${course?.teacher?.login}`}
                                                         aria-label="A tooltip">
                                                    <Avatar bgColor={'blue.200'} size="md" name={course?.teacher?.login}
                                                            src={`${process.env.IMAGES_URL}/${course?.teacher?.imageUrl}`}/>
                                                </Tooltip>
                                            </a>
                                        </NextLink>
                                    </Box>
                                </Flex>
                                <Box mt={7}>
                                    <Heading
                                        color={courseModulesHeadingColor}
                                        fontSize={'md'}
                                        fontFamily={'heading'}>
                                        Módulos
                                    </Heading>
                                    <Scrollbar maxH={'65vh'}>
                                        <List>
                                            {course?.modules && course.modules.map((module) => (
                                                <ListItem key={module.id}>
                                                    <Box py={2} pr={2}>
                                                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                            <Heading size={'xs'}>{module.alias}</Heading>
                                                            <NextLink
                                                                href={`/course/${courseSlug}/module/${module?.discipline?.slug}`}>
                                                                <a>
                                                                    <Button size={'sm'}>Abrir</Button>
                                                                </a>
                                                            </NextLink>
                                                        </Flex>
                                                    </Box>
                                                    <Divider/>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Scrollbar>
                                </Box>
                            </Box>
                        ) : (
                            <Loading/>
                        )}
                    </GridItem>
                    <GridItem colSpan={{base: 12, lg: 7}}>
                        <Tabs size={'md'} defaultIndex={1}>
                            <TabList>
                                <Tab isDisabled={auth.user.hasOnlyAuthority([AuthorityEnum.USER])}>Resultados</Tab>
                                <Tab>Classificação</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {course?.modules && course.modules[0] && (
                                        <UserResultsMatrix moduleId={course.modules[0].id}/>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {Array.isArray(userRanks) ? (
                                        <CardBox>
                                            <UserRanksTable userRanks={userRanks}/>
                                        </CardBox>
                                    ) : (
                                        <Loading/>
                                    )}

                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </GridItem>
                </Grid>
            </DefaultLayout>
        </>
    );
};

export default protectedRoute(CoursePage);
