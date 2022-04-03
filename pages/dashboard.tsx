import DefaultLayout from '../components/Layouts/DefaultLayout';
import {Box, Center, Divider, Heading, SimpleGrid, Skeleton, Spinner} from '@chakra-ui/react';
import EntityStatusCard from '../components/EntityStatusCard';
import {FiBook} from 'react-icons/fi';
import {VscFileSubmodule, VscNotebook} from 'react-icons/vsc';
import {MdOutlineTopic} from 'react-icons/md';
import {useQuery} from 'react-query';
import {getSummary} from '../services/DashboardService';
import {useMemo} from 'react';
import {EntityStatusCardType} from '../types/EntityStatusCard.type';
import {useAuthContext} from '../contexts/AuthContext';
import protectedRoute from '../components/ProtectedRoute';
import CourseCard from '../components/CourseCard';
import {getCourses} from '../services/CourseService';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {Course, CourseType} from '../types/Course.type';
import EntityNotFound from '../components/EntityNotFound';

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
    const auth = useAuthContext();
    const {data: summary, isLoading} = useQuery('teacherSummary', () => {
        return getSummary(auth.getRoutePrefix()).then(res => res?.data);
    });
    const {data: courses, isLoading: isLoadingCourses} = useQuery('dashboardCourses', () => {
        return getCourses(RoutePrefixEnum.ACCOUNT).then(res => {
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
                return course.isPublic() || (course.isTest() && auth.user.isAdmin());
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
    return (
        <DefaultLayout title={'Painel de controle'}>
            <Box>
                <Heading fontSize={'3xl'}>
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
