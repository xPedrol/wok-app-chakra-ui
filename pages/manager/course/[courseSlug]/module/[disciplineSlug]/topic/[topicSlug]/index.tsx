import DefaultLayout from "../../../../../../../../components/Layouts/DefaultLayout";
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
    Tag,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import Loading from "../../../../../../../../components/feedback/Loading";
import CardBox from "../../../../../../../../components/chakraCustom/CardBox";
import EntityNotFound from "../../../../../../../../components/feedback/EntityNotFound";
import {useQuery} from "react-query";
import {getModuleTopic} from "../../../../../../../../services/ModuleTopicService";
import {useAuthContext} from "../../../../../../../../contexts/AuthContext";
import {useRouter} from "next/router";
import {toModuleTopic} from "../../../../../../../../dataFormatters/ModuleTopicFormatter";
import {protectedRoute} from "../../../../../../../../HOC/ProtectedRoute";
import {useForm} from "react-hook-form";
import {CourseType} from "../../../../../../../../types/Course.type";
import {DATE_TIME_LOCAL} from "../../../../../../../../dataFormatters/DateFormats";
import {ModuleTopicType} from "../../../../../../../../types/ModuleTopic.type";
import ModuleTopicExerciseTable from "../../../../../../../../components/lists/tables/ModuleTopicExerciseTable";
import Scrollbar from "../../../../../../../../components/styledComponents/Scrollbar";
import {getTopicByModuleTopicId} from "../../../../../../../../services/TopicService";

type RouterQuery = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
}
type Inputs = {
    minScore: number
    maxGrade: number
    targetScore: number
    itemorder: number
    activeTime: string
    deactiveTime: string
    startTime: string
    endTime: string
    freezeTime: string
    unfreezeTime: string
    activated: boolean
}
const ManagerModuleTopicPage = () => {
    const router = useRouter();
    const {courseSlug, disciplineSlug, topicSlug} = router.query as RouterQuery;
    const auth = useAuthContext();
    const {
        data: moduleTopic,
        isLoading: isLoadingModuleTopic
    } = useQuery([courseSlug, disciplineSlug, topicSlug, 'moduleTopic'], () => {
        return getModuleTopic(auth.getRoutePrefix(), courseSlug, disciplineSlug, topicSlug).then(res => toModuleTopic(res.data));
    }, {
        enabled: !!(courseSlug && disciplineSlug && topicSlug),
        onSuccess: (data) => {
            updateFields(data);
        },
        refetchOnWindowFocus: false
    });

    const {
        data: topic,
        isLoading: isLoadingTopic
    } = useQuery([topicSlug, 'topic'], () => {
        return getTopicByModuleTopicId(moduleTopic.id).then(res => res.data);
    }, {
        enabled: !!moduleTopic
    });
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
    };
    const updateFields = (course: ModuleTopicType) => {
        setValue('startTime', course.startTime.format(DATE_TIME_LOCAL));
        setValue('endTime', course.endTime.format(DATE_TIME_LOCAL));
        setValue('activeTime', course.activeTime.format(DATE_TIME_LOCAL));
        setValue('deactiveTime', course.deactiveTime.format(DATE_TIME_LOCAL));
        setValue('freezeTime', course.freezeTime.format(DATE_TIME_LOCAL));
        setValue('unfreezeTime', course.unfreezeTime.format(DATE_TIME_LOCAL));
        setValue('itemorder', course.itemorder);
        setValue('minScore', course.minScore);
        setValue('targetScore', course.targetScore);
        setValue('maxGrade', course.maxGrade);
        setValue('activated', true);
    };

    const getTopicHTML = () => {
        return {__html: topic.html};
    };
    return (
        <>
            <DefaultLayout title={'Topic'}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    {isLoadingModuleTopic ? (
                        <GridItem colSpan={{base: 12}}>
                            <Loading/>
                        </GridItem>
                    ) : (
                        moduleTopic ? (
                            <>
                                <GridItem colSpan={{base: 12, lg: 4}}>

                                    <CardBox>
                                        <Flex alignItems={'center'} flexDirection={'column'} mb={5}>
                                            <Avatar size={'lg'} mb={2}/>
                                            <Heading mb={1}
                                                     fontSize={'md'}>
                                                {moduleTopic.topic.name}
                                            </Heading>
                                            <Heading mb={1}
                                                     fontSize={'sm'}>
                                                {moduleTopic.exercises.length} exerc??cio(s)
                                            </Heading>
                                        </Flex>
                                        <Wrap gap={5} justify={'center'} mb={5}>

                                            <WrapItem>
                                                {moduleTopic.availableToSee ? (
                                                    <Tag colorScheme={'green'}>Alunos podem acessar</Tag>
                                                ) : (
                                                    <Tag colorScheme={'red'}>Alunos n??o podem acessar</Tag>
                                                )}
                                            </WrapItem>
                                            <WrapItem>
                                                {moduleTopic.availableToSee ? (
                                                    <Tag colorScheme={'green'}>Alunos podem resolver</Tag>
                                                ) : (
                                                    <Tag colorScheme={'red'}>Alunos n??o podem resolver</Tag>
                                                )}
                                            </WrapItem>
                                        </Wrap>
                                        <List>
                                            <ListItem>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>Exerc??cios A</Heading>
                                                        <Tag>{moduleTopic.numAExercisesCached}</Tag>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                            <ListItem>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>Exerc??cios B</Heading>
                                                        <Tag>{moduleTopic.numBExercisesCached}</Tag>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                            <ListItem>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>Exerc??cios C</Heading>
                                                        <Tag>{moduleTopic.numCExercisesCached}</Tag>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                            <ListItem>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>Exerc??cios D</Heading>
                                                        <Tag>{moduleTopic.numDExercisesCached}</Tag>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                            <ListItem>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>Exerc??cios sem n??vel</Heading>
                                                        <Tag>{moduleTopic.numOExercisesCached()}</Tag>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                        </List>
                                    </CardBox>


                                </GridItem>
                                <GridItem colSpan={{base: 12, lg: 8}}>
                                    <>
                                        {moduleTopic && (
                                            <CardBox>
                                                <Flex mb={5} justifyContent={'space-between'}>
                                                    <Box>
                                                        <Heading mb={1}
                                                                 fontSize={'md'}
                                                                 fontFamily={'heading'}>
                                                            Informa????es Gerais
                                                        </Heading>
                                                    </Box>
                                                </Flex>
                                                <Box>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <Grid templateColumns={'repeat(12,1fr)'} gap={4}>
                                                            <GridItem colSpan={{base: 12, md: 3}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="minScore">Pontua????o
                                                                        m??nima</FormLabel>
                                                                    <Input id="minScore"
                                                                           type="number" {...register("minScore")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 3}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="maxGrade">Nota
                                                                        m??xima</FormLabel>
                                                                    <Input id="maxGrade"
                                                                           type="number"  {...register("maxGrade")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 3}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="targetScore">M??dia</FormLabel>
                                                                    <Input id="targetScore"
                                                                           type="number"  {...register("targetScore")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 3}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="itemorder">Ordem do
                                                                        t??pico</FormLabel>
                                                                    <Input id="itemorder"
                                                                           type="number"  {...register("itemorder")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="startTime">Data de
                                                                        ativa????o</FormLabel>
                                                                    <Input id="startTime"
                                                                           type="datetime-local"  {...register("activeTime")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="endTime">Data de
                                                                        desativa????o</FormLabel>
                                                                    <Input id="endTime"
                                                                           type="datetime-local"  {...register("deactiveTime")}/>
                                                                </FormControl>
                                                            </GridItem>

                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="startTime">Data de
                                                                        in??cio</FormLabel>
                                                                    <Input id="startTime"
                                                                           type="datetime-local"  {...register("startTime")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="endTime">Data de
                                                                        t??rmino</FormLabel>
                                                                    <Input id="endTime"
                                                                           type="datetime-local"  {...register("endTime")}/>
                                                                </FormControl>
                                                            </GridItem>

                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="freezeTime">Data de
                                                                        pausa</FormLabel>
                                                                    <Input id="freezeTime"
                                                                           type="datetime-local"  {...register("freezeTime")}/>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12, md: 6}}>
                                                                <FormControl>
                                                                    <FormLabel htmlFor="unfreezeTime">Data de fim da
                                                                        pausa</FormLabel>
                                                                    <Input id="unfreezeTime"
                                                                           type="datetime-local"  {...register("unfreezeTime")}/>
                                                                </FormControl>
                                                            </GridItem>

                                                            <GridItem colSpan={{base: 12}}>
                                                                <FormControl>
                                                                    <Checkbox {...register("activated")}>Ativo</Checkbox>
                                                                </FormControl>
                                                            </GridItem>
                                                            <GridItem colSpan={{base: 12}} justifySelf={'end'}>
                                                                <Button colorScheme={'blue'}
                                                                        type={'submit'}>Salvar</Button>
                                                            </GridItem>
                                                        </Grid>
                                                    </form>
                                                </Box>
                                            </CardBox>
                                        )}
                                    </>
                                </GridItem>
                            </>
                        ) : (
                            <GridItem colSpan={{base: 12}}>
                                <EntityNotFound message={'Nenhum m??dulo foi encontrado'}/>
                            </GridItem>
                        )
                    )}

                    <GridItem colSpan={{base: 12}}>
                        <Tabs size={'md'} defaultIndex={0}>
                            <TabList>
                                <Tab>Exerc??cios</Tab>
                                <Tab>Conte??do</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {isLoadingModuleTopic ? (
                                        <Loading/>
                                    ) : (
                                        <>
                                            {moduleTopic?.exercises && moduleTopic.exercises.length > 0 ? (
                                                <CardBox>
                                                    <Scrollbar maxH={'55vh'}>
                                                        <ModuleTopicExerciseTable mTExercises={moduleTopic.exercises}
                                                                                  openingUrl={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise`}
                                                                                  settingsUrl={`${router.asPath}/exercise`}/>
                                                    </Scrollbar>
                                                </CardBox>
                                            ) : (
                                                <EntityNotFound message={'Nenhum exerc??cio foi encontrado'}/>
                                            )}
                                        </>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {isLoadingTopic ? (
                                        <Loading/>
                                    ) : (
                                        <>
                                            {topic ? (
                                                <CardBox>
                                                    <div dangerouslySetInnerHTML={getTopicHTML()}></div>
                                                </CardBox>
                                            ) : (
                                                <EntityNotFound message={'Conte??do do t??pico n??o foi encontrado'}/>
                                            )}
                                        </>
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
export default protectedRoute(ManagerModuleTopicPage);