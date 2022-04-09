import {protectedRoute} from '../../../../../HOC/ProtectedRoute';
import DefaultLayout from '../../../../../components/Layouts/DefaultLayout';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useAuthContext} from '../../../../../contexts/AuthContext';
import {getModuleTopics} from '../../../../../services/ModuleTopicService';
import {getModule} from '../../../../../services/ModuleService';
import {Box, Grid, GridItem, Heading, Stack, Tag, Text, Wrap, WrapItem} from '@chakra-ui/react';
import ModuleTopicsTreeView from '../../../../../components/ModuleTopicsTreeView';
import {ModuleBasicType} from '../../../../../types/basics/ModuleBasicType';
import {ModuleTopicType} from '../../../../../types/ModuleTopic.type';
import {Icon} from '@chakra-ui/icons';
import {BiSearchAlt} from 'react-icons/bi';
import Loading from '../../../../../components/Loading';
import {useState} from 'react';
import {DATE_CLASSIC_FORMAT} from '../../../../../dataFormatters/DateFormats';
import {toModuleTopicsMx} from "../../../../../dataFormatters/ModuleTopicFormatter";

type RouterQueryType = { disciplineSlug: string, courseSlug: string }
const ModulePage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const {disciplineSlug, courseSlug} = router.query as RouterQueryType;
    const {data: moduleTopics}: { data: ModuleTopicType[][] } = useQuery(['moduleTopics[][]', courseSlug, disciplineSlug], () => {
        return getModuleTopics(auth.getRoutePrefix(), courseSlug, disciplineSlug).then(res => toModuleTopicsMx(res.data));
    });
    const {data: module}: { data: ModuleBasicType } = useQuery('completeModule', () => {
        return getModule(auth.getRoutePrefix(true), courseSlug, disciplineSlug).then(res => res.data);
    });

    const [selectedModuleTopic, setSelectedModuleTopic] = useState<ModuleTopicType | undefined>(undefined);

    return (
        <DefaultLayout title={`${module?.alias}`}>
            <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem colSpan={{base: 12, lg: 7}}>
                    <Heading size={'sm'}>Tópicos</Heading>
                    {Array.isArray(moduleTopics) ? (
                        <ModuleTopicsTreeView moduleTopics={moduleTopics}
                                              baseCardUrl={`/course/${courseSlug}/module/${disciplineSlug}`}
                                              setSelectedModuleTopic={setSelectedModuleTopic}/>
                    ) : (
                        <Loading/>
                    )}
                </GridItem>
                <GridItem colSpan={{base: 12, lg: 5}}>
                    <Heading size={'sm'}>Descrição do Tópico</Heading>
                    <Box mt={'40px'} textAlign={'center'}>
                        {selectedModuleTopic ? (
                                <Wrap spacing={2}>
                                    {selectedModuleTopic?.availableToDo && (
                                        <WrapItem>
                                            <Tag>Fecha em {selectedModuleTopic?.endTime.format(DATE_CLASSIC_FORMAT)}</Tag>
                                        </WrapItem>
                                    )}
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Pontos necessários {selectedModuleTopic?.minScore}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Média {selectedModuleTopic?.targetScore}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Pontuação máxima {selectedModuleTopic?.maxGrade}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Exercícios
                                            A {selectedModuleTopic?.getTotalExercise('A')}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Exercícios
                                            A {selectedModuleTopic?.getTotalExercise('B')}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Exercícios
                                            A {selectedModuleTopic?.getTotalExercise('C')}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Exercícios
                                            A {selectedModuleTopic?.getTotalExercise('D')}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme='blue'>Exercícios
                                            A {selectedModuleTopic?.getTotalExercise('O')}</Tag>
                                    </WrapItem>
                                </Wrap>
                            )

                            : (
                                <>
                                    <Icon fontSize={'30px'} as={BiSearchAlt}/>
                                    <Text fontWeight={600}>Selecione um tópico</Text>
                                </>
                            )}
                    </Box>
                </GridItem>
            </Grid>
        </DefaultLayout>
    );
};
export default protectedRoute(ModulePage);
