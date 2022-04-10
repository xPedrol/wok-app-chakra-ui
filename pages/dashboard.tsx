import DefaultLayout from '../components/Layouts/DefaultLayout';
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Skeleton,
    Spinner, useDisclosure,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import EntityStatusCard from '../components/EntityStatusCard';
import {FiBook} from 'react-icons/fi';
import {VscFileSubmodule, VscNotebook} from 'react-icons/vsc';
import {MdOutlineTopic} from 'react-icons/md';
import {useQuery, useQueryClient} from 'react-query';
import {getSummary} from '../services/DashboardService';
import {useMemo, useState} from 'react';
import {EntityStatusCardType} from '../types/EntityStatusCard.type';
import {useAuthContext} from '../contexts/AuthContext';
import CourseCard from '../components/CourseCard';
import {getCourses} from '../services/CourseService';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {Course, CourseType} from '../types/Course.type';
import EntityNotFound from '../components/EntityNotFound';
import {protectedRoute} from '../HOC/ProtectedRoute';
import {GoPlus} from "react-icons/go";
import AddCourseDialog from "../components/Dialogs/AddCourseDialog";

const courseCard: EntityStatusCardType = {
    title: 'Cursos',
    stat: '---',
    icon: <FiBook size={'3em'}/>
};
const moduleCard: EntityStatusCardType = {
    title: 'Módulos',
    stat: '---',
    icon: <VscFileSubmodule size={'3em'}/>
};
const topicCard: EntityStatusCardType = {
    title: 'Tópicos',
    stat: '---',
    icon: <MdOutlineTopic size={'3em'}/>
};
const exerciseCard: EntityStatusCardType = {
    title: 'Exercícios',
    stat: '---',
    icon: <VscNotebook size={'3em'}/>
};

function Dashboard() {
    const {
        isOpen: isAddCourseDialogOpen,
        onOpen: onOpenAddCourseDialog,
        onClose: onCLoseOpenAddCourseDialog
    } = useDisclosure();
    const [isPrivateCourse, setIsPrivateCourse] = useState<boolean>(true);
    const openPrivateAddCourseDialog = () => {
        setIsPrivateCourse(true)
        onOpenAddCourseDialog();
    }
    const openPublicAddCourseDialog = () => {
        setIsPrivateCourse(false)
        onOpenAddCourseDialog();
    }
    const auth = useAuthContext();
    const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
    const {data: summary, isLoading} = useQuery('teacherSummary', () => {
        return getSummary(auth.getRoutePrefix()).then(res => res?.data);
    });
    const {data: courses, isLoading: isLoadingCourses} = useQuery(['dashboardCourses', showAllCourses], () => {
        const prefix = auth.user.isTeacher() ? RoutePrefixEnum.TEACHER : RoutePrefixEnum.ACCOUNT;
        return getCourses(prefix, showAllCourses).then(res => {
            return res.data.map(course => {
                return new Course(course);
            });
        });
    });
    let cPrivates: CourseType[] | undefined = useMemo(() => {
        if (courses) {
            return courses.filter(course => {
                return course.isPrivate();
            });
        }
        return undefined;
    }, [courses]);
    let cPublic: CourseType[] | undefined = useMemo(() => {
        if (courses) {
            return courses.filter(course => {
                // && auth.user.isAdmin()
                return course.isPublic() || (course.isTest());
            });
        }
        return undefined;
    }, [courses]);

    useMemo(() => {
        if (summary) {
            courseCard.stat = summary.totalCourses;
            moduleCard.stat = summary.totalModules;
            topicCard.stat = summary.totalTopics;
            exerciseCard.stat = summary.totalExercises;
        }
    }, [summary]);

    const changeShowAllCourses = () => {
        setShowAllCourses(!showAllCourses);
    }
    return (
        <DefaultLayout title={'Painel de controle'}>
            <Box>
                <Heading fontSize={'3xl'} fontWeight={'800'}>
                    Painel de controle
                </Heading>
                <Divider mb={'15px'} mt={'10px'}/>
                <SimpleGrid columns={{
                    lg: 4,
                    md: 2,
                    sm: 1
                }} gap={4}>
                    <Skeleton isLoaded={!isLoading}>
                        <EntityStatusCard data={courseCard}/>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                        <EntityStatusCard data={moduleCard}/>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                        <EntityStatusCard data={topicCard}/>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                        <EntityStatusCard data={exerciseCard}/>
                    </Skeleton>
                </SimpleGrid>
            </Box>
            <Flex justifyContent={'flex-end'} alignItems={'center'} mt={3}>
                <Wrap direction={'row'} spacing={2}>
                    <WrapItem>
                        <Button leftIcon={<GoPlus/>} size={'xs'} variant={'outline'} colorScheme={'blue'}
                                onClick={openPrivateAddCourseDialog}>Curso</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button leftIcon={<GoPlus/>} size={'xs'} variant={'outline'}
                                colorScheme={'blue'} onClick={openPublicAddCourseDialog}>Treinamento</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button onClick={changeShowAllCourses} size={'xs'} variant={'outline'} colorScheme={'blue'}>Exibir
                            tudo</Button>
                    </WrapItem>
                </Wrap>
            </Flex>
            <Box mt={'40px'}>
                <Heading fontSize={'2xl'} mb={4}>
                    Cursos
                </Heading>
                <CoursesGrid isLoadingCourses={isLoadingCourses} courses={cPrivates}/>
            </Box>

            <Box mt={'40px'}>
                <Heading fontSize={'2xl'} mb={4}>
                    Treinamentos
                </Heading>
                <CoursesGrid isLoadingCourses={isLoadingCourses} courses={cPublic}/>
            </Box>
            <AddCourseDialog isPrivateCourse={isPrivateCourse} isOpen={isAddCourseDialogOpen}
                             onClose={onCLoseOpenAddCourseDialog}/>
        </DefaultLayout>
    );
}

type CourseGridProps = {
    isLoadingCourses: boolean
    courses: CourseType[] | undefined
}

function CoursesGrid({isLoadingCourses, courses}: CourseGridProps): any {
    return (
        <>
            {isLoadingCourses ? (
                <Center py={3}>
                    <Spinner size="md"/>
                </Center>
            ) : (
                <>
                    {(courses && courses?.length > 0) ? (
                        <SimpleGrid columns={{
                            xl: 3,
                            lg: 2,
                            md: 2,
                            sm: 1
                        }} gap={4}>
                            {courses.map(course => (
                                <CourseCard key={course.id} course={course}/>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <EntityNotFound message={'Nenhum curso privado foi encontrado'}/>
                    )}
                </>
            )}</>
    );
}

export default protectedRoute(Dashboard);
