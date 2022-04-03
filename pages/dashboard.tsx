import DefaultLayout from '../components/Layouts/DefaultLayout';
import {ProtectedRoute} from '../components/ProtectedRoute';
import {Divider, Heading, SimpleGrid, Skeleton} from '@chakra-ui/react';
import EntityStatusCard from '../components/EntityStatusCard';
import {FiBook} from 'react-icons/fi';
import {VscFileSubmodule, VscNotebook} from 'react-icons/vsc';
import {MdOutlineTopic} from 'react-icons/md';
import {useQuery} from 'react-query';
import {getTeacherSummary} from '../services/DashboardService';
import {useMemo} from 'react';
import {EntityStatusCardType} from '../types/EntityStatusCard.type';

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
    const {data, isLoading} = useQuery('teacherSummary', getTeacherSummary);
    const summary = data?.data;
    useMemo(() => {
        if (summary) {
            courseCard.stat = summary.totalCourses;
            moduleCard.stat = summary.totalModules;
            topicCard.stat = summary.totalTopics;
            exerciseCard.stat = summary.totalExercises;
        }
    }, [summary]);
    return (
        <ProtectedRoute>
            <DefaultLayout title={'Painel de controle'}>
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
            </DefaultLayout>
        </ProtectedRoute>
    );
}

export default Dashboard;
