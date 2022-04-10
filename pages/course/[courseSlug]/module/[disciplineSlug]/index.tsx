import {protectedRoute} from '../../../../../HOC/ProtectedRoute';
import DefaultLayout from '../../../../../components/Layouts/DefaultLayout';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useAuthContext} from '../../../../../contexts/AuthContext';
import {getModuleTopics} from '../../../../../services/ModuleTopicService';
import {getModule} from '../../../../../services/ModuleService';
import {Box, Divider, Grid, GridItem, Heading, Tag, Text, Wrap, WrapItem} from '@chakra-ui/react';
import ModuleTopicsTreeView from '../../../../../components/ModuleTopicsTreeView';
import {ModuleBasicType} from '../../../../../types/basics/ModuleBasicType';
import {ModuleTopic, ModuleTopicType} from '../../../../../types/ModuleTopic.type';
import {Icon} from '@chakra-ui/icons';
import {BiSearchAlt} from 'react-icons/bi';
import Loading from '../../../../../components/Loading';
import {useState} from 'react';
import {DATE_CLASSIC_FORMAT} from '../../../../../dataFormatters/DateFormats';
import {toModuleTopicsMx} from "../../../../../dataFormatters/ModuleTopicFormatter";
import EntityNotFound from "../../../../../components/EntityNotFound";
import {getUserTopicResultsByTopicId} from "../../../../../services/UserTopicResultService";
import {UserTopicPerformanceType} from "../../../../../types/user/UserTopicPerformance.type";
import {AuthorityEnum} from "../../../../../types/user/Authority.type";
import {toUserTopicPerformance} from "../../../../../dataFormatters/UserTopicPerformanceFormatter";

type RouterQueryType = { disciplineSlug: string, courseSlug: string }
const ModulePage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const {disciplineSlug, courseSlug} = router.query as RouterQueryType;
    const [selectedModuleTopic, setSelectedModuleTopic] = useState<ModuleTopicType | undefined>(undefined);
    const {
        data: moduleTopics,
        isLoading: isLoadingMTs
    }: { data: ModuleTopicType[][], isLoading: boolean } = useQuery(['moduleTopics[][]', courseSlug, disciplineSlug], () => {
        return getModuleTopics(auth.getRoutePrefix(), courseSlug, disciplineSlug).then(res => toModuleTopicsMx(res.data));
    });

    const {data: module}: { data: ModuleBasicType } = useQuery('completeModule', () => {
        return getModule(auth.getRoutePrefix(true), courseSlug, disciplineSlug).then(res => res.data);
    });

    const {
        data: userTopicPerformances,
        isLoading: isLoadingUserTopicPerformances
    }: { data: UserTopicPerformanceType, isLoading: boolean } = useQuery([selectedModuleTopic?.id, 'userTopicPerformances'], () => {
        return getUserTopicResultsByTopicId(selectedModuleTopic.id).then(res => toUserTopicPerformance(res.data));
    }, {
        enabled: !!selectedModuleTopic?.id && auth.user.hasOnlyAuthority([AuthorityEnum.USER])
    });
    const selectModuleTopic = (mT: ModuleTopicType) => {
        if (mT) {
            mT = new ModuleTopic(mT);
            if (userTopicPerformances) {
                mT.unresolvedResolved = mT.getUnresolvedResolved(userTopicPerformances);
            }
        }
        setSelectedModuleTopic(mT)
    }

    return (
        <DefaultLayout title={`${module?.alias}`}>
            <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem colSpan={{base: 12, lg: 7}}>
                    <Heading size={'sm'}>Tópicos</Heading>
                    {isLoadingMTs ? (
                        <Loading/>
                    ) : (
                        <>
                            {moduleTopics && moduleTopics.length > 0 ? (
                                <ModuleTopicsTreeView moduleTopics={moduleTopics}
                                                      baseCardUrl={`/course/${courseSlug}/module/${disciplineSlug}`}
                                                      setSelectedModuleTopic={selectModuleTopic}/>
                            ) : (
                                <EntityNotFound mT={3} textSize={'sm'} iconSize={35}
                                                message={'Nenhum tópico foi encontrado'}/>
                            )}
                        </>
                    )}

                </GridItem>
                <GridItem colSpan={{base: 12, lg: 5}}>
                    <Box position={'sticky'} top={3}>
                        <Heading size={'sm'}>Descrição do Tópico</Heading>
                        <Box mt={3} textAlign={'center'}>
                            {selectedModuleTopic ? (
                                    <>
                                        <Wrap spacing={2}>
                                            {selectedModuleTopic?.availableToDo && (
                                                <WrapItem>
                                                    <Tag>Fecha
                                                        em {selectedModuleTopic?.endTime.format(DATE_CLASSIC_FORMAT)}</Tag>
                                                </WrapItem>
                                            )}
                                            <WrapItem>
                                                <Tag colorScheme='blue'>Pontos
                                                    necessários: {selectedModuleTopic?.minScore}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='blue'>Média: {selectedModuleTopic?.targetScore}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='blue'>Pontuação
                                                    máxima: {selectedModuleTopic?.maxGrade}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='green'>Exercícios nível
                                                    A: {selectedModuleTopic?.getTotalExercise('A')}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='blue'>Exercícios nível
                                                    B: {selectedModuleTopic?.getTotalExercise('B')}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='orange'>Exercícios nível
                                                    C: {selectedModuleTopic?.getTotalExercise('C')}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag colorScheme='red'>Exercícios nível
                                                    D: {selectedModuleTopic?.getTotalExercise('D')}</Tag>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tag>Exercícios sem
                                                    nível: {selectedModuleTopic?.getTotalExercise('O')}</Tag>
                                            </WrapItem>
                                        </Wrap>
                                        {auth.user.hasOnlyAuthority([AuthorityEnum.USER]) && (
                                            <>
                                                <Divider my={2}/>
                                                <Heading size={'xs'} textAlign={'start'} mb={3}>
                                                    Desempenho do usuário
                                                </Heading>
                                                {isLoadingUserTopicPerformances ? (
                                                    <Loading/>
                                                ) : (
                                                    <>
                                                        {userTopicPerformances ? (
                                                            <Wrap spacing={2}>
                                                                <WrapItem>
                                                                    <Tag colorScheme='blue'>Pontuação
                                                                        total: {userTopicPerformances?.point}</Tag>
                                                                </WrapItem>
                                                                <WrapItem>
                                                                    <Tag
                                                                        colorScheme='green'>Resolveu {userTopicPerformances?.numAresolved} exercícios
                                                                        de nível A</Tag>
                                                                </WrapItem>
                                                                <WrapItem>
                                                                    <Tag
                                                                        colorScheme='blue'>Resolveu {userTopicPerformances?.numBresolved} exercícios
                                                                        de nível B</Tag>
                                                                </WrapItem>
                                                                <WrapItem>
                                                                    <Tag
                                                                        colorScheme='orange'>Resolveu {userTopicPerformances?.numCresolved} exercícios
                                                                        de nível C</Tag>
                                                                </WrapItem>
                                                                <WrapItem>
                                                                    <Tag
                                                                        colorScheme='red'>Resolveu {userTopicPerformances?.numDresolved} exercícios
                                                                        de nível D</Tag>
                                                                </WrapItem>

                                                                <WrapItem>
                                                                    {
                                                                        selectedModuleTopic?.unresolvedResolved && selectedModuleTopic.unresolvedResolved > 0 ? (
                                                                            <Tag
                                                                                colorScheme='orange'>Falta(m) {selectedModuleTopic?.unresolvedResolved} exercício(s)
                                                                                para resolver</Tag>
                                                                        ) : (
                                                                            <Tag
                                                                                colorScheme='green'>Todos os exercícios
                                                                                foram
                                                                                resolvidos</Tag>
                                                                        )
                                                                    }

                                                                </WrapItem>
                                                            </Wrap>
                                                        ) : (
                                                            <EntityNotFound textSize={'sm'} iconSize={35}
                                                                            message={'Nenhuma estatística de desempenho foi encontrada para este tópico'}/>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>

                                )

                                : (
                                    <>
                                        <Icon fontSize={'30px'} as={BiSearchAlt}/>
                                        <Text fontWeight={600}>Selecione um tópico</Text>
                                    </>
                                )}
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </DefaultLayout>
    );
};
export default protectedRoute(ModulePage);
