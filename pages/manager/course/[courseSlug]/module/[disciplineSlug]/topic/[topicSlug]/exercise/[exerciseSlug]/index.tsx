import DefaultLayout from "../../../../../../../../../../components/Layouts/DefaultLayout";
import {useQuery} from "react-query";
import {getModuleTopicExercise} from "../../../../../../../../../../services/ModuleTopicExerciseService";
import {useAuthContext} from "../../../../../../../../../../contexts/AuthContext";
import {useRouter} from "next/router";
import {
    Avatar,
    Box, Button, Checkbox,
    Divider,
    Flex, FormControl, FormLabel,
    Grid,
    GridItem,
    Heading, Input,
    List,
    ListItem, Tab, TabList, TabPanel, TabPanels, Tabs,
    Tag, Text,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import Loading from "../../../../../../../../../../components/feedback/Loading";
import CardBox from "../../../../../../../../../../components/chakraCustom/CardBox";
import EntityNotFound from "../../../../../../../../../../components/feedback/EntityNotFound";
import Scrollbar from "../../../../../../../../../../components/styledComponents/Scrollbar";
import ModuleTopicExerciseTable from "../../../../../../../../../../components/lists/tables/ModuleTopicExerciseTable";
import {protectedRoute} from "../../../../../../../../../../HOC/ProtectedRoute";

type RouterQuery = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
    exerciseSlug: string
}
const ManagerExercisePage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const {courseSlug, disciplineSlug, topicSlug, exerciseSlug} = router.query as RouterQuery;
    const {data: mTExercise, isLoading: isLoadingMTE} = useQuery('', () => {
        return getModuleTopicExercise(auth.getRoutePrefix(), courseSlug, disciplineSlug, topicSlug, exerciseSlug).then(res => res.data);
    });
    return (
        <DefaultLayout title={'Exercício'}>
            <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                {isLoadingMTE ? (
                    <GridItem colSpan={{base: 12}}>
                        <Loading/>
                    </GridItem>
                ) : (
                    mTExercise ? (
                        <>
                            <GridItem colSpan={{base: 12, lg: 4}}>

                                <CardBox>
                                    <Flex flexDirection={'column'} mb={5}>
                                        <Heading mb={1}
                                                 fontSize={'md'}>
                                            {mTExercise.exercise.name}
                                        </Heading>
                                    </Flex>
                                    <Box>
                                        <Wrap gap={5} justify={'start'} mb={5}>
                                            <WrapItem>
                                                <Tag
                                                    colorScheme={'blue'}>Dificuldade: {mTExercise.difficultyLevel.id}</Tag>
                                            </WrapItem>
                                        </Wrap>
                                        <Text mt={4}>
                                            {mTExercise.exercise.description}
                                        </Text>
                                    </Box>
                                    <List mt={5}>
                                        <ListItem>
                                            <Box py={2} pr={2}>
                                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                    <Heading size={'xs'}>Cénarios</Heading>
                                                    <Tag>{0}</Tag>
                                                </Flex>
                                            </Box>
                                            <Divider/>
                                        </ListItem>
                                        <ListItem>
                                            <Box py={2} pr={2}>
                                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                    <Heading size={'xs'}>Submissões</Heading>
                                                    <Tag>{0}</Tag>
                                                </Flex>
                                            </Box>
                                            <Divider/>
                                        </ListItem>
                                    </List>
                                </CardBox>

                            </GridItem>
                            <GridItem colSpan={{base: 12, lg: 8}}>
                                <>
                                    {mTExercise && (
                                        <CardBox>
                                            <Flex mb={5} justifyContent={'space-between'}>
                                                <Box>
                                                    <Heading mb={1}
                                                             fontSize={'md'}
                                                             fontFamily={'heading'}>
                                                        Cenários
                                                    </Heading>
                                                </Box>
                                            </Flex>

                                        </CardBox>
                                    )}
                                </>
                            </GridItem>
                        </>
                    ) : (
                        <GridItem colSpan={{base: 12}}>
                            <EntityNotFound message={'Nenhum módulo foi encontrado'}/>
                        </GridItem>
                    )
                )}
                <GridItem colSpan={{base: 12}}>
                    <Tabs size={'md'} defaultIndex={0}>
                        <TabList>
                            <Tab>Submissões</Tab>
                            <Tab>Soluções</Tab>
                        </TabList>
                        <TabPanels>
                            {/*<TabPanel>*/}
                            {/*    {isLoadingModuleTopic ? (*/}
                            {/*        <Loading/>*/}
                            {/*    ) : (*/}
                            {/*        <>*/}
                            {/*            {moduleTopic?.exercises && moduleTopic.exercises.length > 0 ? (*/}
                            {/*                <CardBox>*/}
                            {/*                    <Scrollbar maxH={'55vh'}>*/}
                            {/*                        <ModuleTopicExerciseTable mTExercises={moduleTopic.exercises}*/}
                            {/*                                                  openingUrl={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise`}*/}
                            {/*                                                  settingsUrl={`${router.asPath}/exercise`}/>*/}
                            {/*                    </Scrollbar>*/}
                            {/*                </CardBox>*/}
                            {/*            ) : (*/}
                            {/*                <EntityNotFound message={'Nenhum exercício foi encontrado'}/>*/}
                            {/*            )}*/}
                            {/*        </>*/}
                            {/*    )}*/}
                            {/*</TabPanel>*/}
                            {/*<TabPanel>*/}
                            {/*    {isLoadingTopic ? (*/}
                            {/*        <Loading/>*/}
                            {/*    ) : (*/}
                            {/*        <>*/}
                            {/*            {topic ? (*/}
                            {/*                <CardBox>*/}
                            {/*                    <div dangerouslySetInnerHTML={getTopicHTML()}></div>*/}
                            {/*                </CardBox>*/}
                            {/*            ) : (*/}
                            {/*                <EntityNotFound message={'Conteúdo do tópico não foi encontrado'}/>*/}
                            {/*            )}*/}
                            {/*        </>*/}
                            {/*    )}*/}
                            {/*</TabPanel>*/}
                        </TabPanels>
                    </Tabs>
                </GridItem>
            </Grid>
        </DefaultLayout>
    );
};
export default protectedRoute(ManagerExercisePage);