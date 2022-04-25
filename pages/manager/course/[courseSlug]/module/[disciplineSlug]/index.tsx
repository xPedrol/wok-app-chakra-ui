import DefaultLayout from "../../../../../../components/Layouts/DefaultLayout";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import CardBox from "../../../../../../components/chakraCustom/CardBox";
import {useForm} from "react-hook-form";
import {CourseType} from "../../../../../../types/Course.type";
import {DATE_TIME_LOCAL} from "../../../../../../dataFormatters/DateFormats";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getModule} from "../../../../../../services/ModuleService";
import {useAuthContext} from "../../../../../../contexts/AuthContext";
import {toModule} from "../../../../../../dataFormatters/ModuleFormatter";
import {protectedRoute} from "../../../../../../HOC/ProtectedRoute";
import Loading from "../../../../../../components/feedback/Loading";
import EntityNotFound from "../../../../../../components/feedback/EntityNotFound";
import {getUserRanksByModule} from "../../../../../../services/UserRankService";
import UserRanksTable from "../../../../../../components/lists/tables/UserRanksTable";
import {getModuleTopics} from "../../../../../../services/ModuleTopicService";
import {toModuleTopics} from "../../../../../../dataFormatters/ModuleTopicFormatter";
import ModuleTopicsTable from "../../../../../../components/lists/tables/ModuleTopicsTable";
import Scrollbar from "../../../../../../components/styledComponents/Scrollbar";

type Inputs = {
    alias: string,
    id: string,
    activated: boolean
}

type RouterQuery = {
    courseSlug: string
    disciplineSlug: string,
}
const ManagerModulePage = () => {
    const moduleSubHeadingColor = useColorModeValue('gray.700', 'gray.400');

    const router = useRouter();
    const {courseSlug, disciplineSlug} = router.query as RouterQuery;
    const auth = useAuthContext();
    const {data: module, isLoading: isLoadingModule} = useQuery([courseSlug, disciplineSlug, 'moduleManager'], () => {
        return getModule(auth.getRoutePrefix(true), courseSlug, disciplineSlug).then(res => toModule(res.data));
    });

    const {data: userRanks} = useQuery([courseSlug, disciplineSlug, 'userRanks'], () => {
        return getUserRanksByModule(auth.getRoutePrefix(), module.id).then(res => res.data);
    }, {
        enabled: !!module
    });

    const {data: moduleTopics, isLoading: isLoadingMTs} = useQuery([courseSlug, disciplineSlug, 'moduleTopics'], () => {
        return getModuleTopics(auth.getRoutePrefix(), courseSlug, disciplineSlug).then(res => toModuleTopics(res.data));
    }, {
        enabled: !!(courseSlug && disciplineSlug),
        onSuccess: (data) => {
        }
    });

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
    };
    const updateFields = (course: CourseType) => {
        setValue('alias', course.startDate.format(DATE_TIME_LOCAL));
        setValue('id', course.endDate.format(DATE_TIME_LOCAL));
        setValue('activated', true);
    };
    return (
        <DefaultLayout title={module?.alias}>
            <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                <GridItem colSpan={{base: 12, lg: 4}}>
                    {isLoadingModule ? (
                        <Loading/>
                    ) : (
                        module ? (
                            <CardBox>
                                <Flex alignItems={'center'} flexDirection={'column'} mb={5}>
                                    <Avatar size={'lg'} mb={2}/>
                                    <Heading mb={1}
                                             fontSize={'md'}>
                                        {module.alias}
                                    </Heading>
                                    <Heading mb={1}
                                             fontSize={'sm'} color={moduleSubHeadingColor}>
                                        {module.topics.length} tópico(s)
                                    </Heading>
                                </Flex>
                                <Wrap gap={5} justify={'center'} mb={5}>
                                    <WrapItem>
                                        <Tag colorScheme={'blue'}>Disciplina {module.discipline.name}</Tag>
                                    </WrapItem>
                                    <WrapItem>
                                        <Tag colorScheme={'orange'}>Curso {module.course.name}</Tag>
                                    </WrapItem>
                                </Wrap>
                                <List>
                                    <ListItem>
                                        <Box py={2} pr={2}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Heading size={'xs'}>Exercícios A</Heading>
                                                <Tag>0</Tag>
                                            </Flex>
                                        </Box>
                                        <Divider/>
                                    </ListItem>
                                    <ListItem>
                                        <Box py={2} pr={2}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Heading size={'xs'}>Exercícios B</Heading>
                                                <Tag>0</Tag>
                                            </Flex>
                                        </Box>
                                        <Divider/>
                                    </ListItem>
                                    <ListItem>
                                        <Box py={2} pr={2}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Heading size={'xs'}>Exercícios C</Heading>
                                                <Tag>0</Tag>
                                            </Flex>
                                        </Box>
                                        <Divider/>
                                    </ListItem>
                                    <ListItem>
                                        <Box py={2} pr={2}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Heading size={'xs'}>Exercícios D</Heading>
                                                <Tag>0</Tag>
                                            </Flex>
                                        </Box>
                                        <Divider/>
                                    </ListItem>
                                    <ListItem>
                                        <Box py={2} pr={2}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Heading size={'xs'}>Exercícios sem nível</Heading>
                                                <Tag>0</Tag>
                                            </Flex>
                                        </Box>
                                        <Divider/>
                                    </ListItem>
                                </List>
                            </CardBox>
                        ) : (
                            <EntityNotFound message={'Nenhum módulo foi encontrado'}/>
                        )
                    )}

                </GridItem>
                <GridItem colSpan={{base: 12, lg: 8}}>
                    <Tabs size={'md'} defaultIndex={0}>
                        <TabList>
                            <Tab>Dados Gerais</Tab>
                            <Tab>Classificação</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <CardBox>
                                    <Flex mb={5}>
                                        <Heading size={'sm'}>Editar</Heading>
                                    </Flex>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid templateColumns={'repeat(12,1fr)'} gap={4}>
                                            <GridItem colSpan={{base: 12, md: 12}}>
                                                <FormControl isInvalid={!!errors.alias}>
                                                    <FormLabel htmlFor="alias">Apelido</FormLabel>
                                                    <Input id="alias"
                                                           type="text" {...register("alias", {required: true})}/>
                                                    <FormErrorMessage>Field is invalid</FormErrorMessage>
                                                </FormControl>
                                            </GridItem>
                                            <GridItem colSpan={{base: 12, md: 12}}>
                                                <Checkbox {...register('activated')}>Ativo</Checkbox>
                                            </GridItem>
                                            <GridItem colSpan={{base: 12}} justifySelf={'end'}>
                                                <Button colorScheme={'blue'} type={'submit'}>Salvar</Button>
                                            </GridItem>
                                        </Grid>
                                    </form>
                                </CardBox>
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
                <GridItem colSpan={{base: 12}}>
                    {isLoadingMTs ? (
                        <Loading/>
                    ) : (
                        <>
                            {moduleTopics && moduleTopics.length > 0 ? (
                                <CardBox>
                                   <Scrollbar maxH={'55vh'}>
                                       <ModuleTopicsTable moduleTopics={moduleTopics}
                                                          openingUrl={`/course/${courseSlug}/module/${disciplineSlug}/topic`}
                                       settingsUrl={`${router.asPath}/topic`}/>
                                   </Scrollbar>
                                </CardBox>
                            ) : (
                                <EntityNotFound message={'Nenhum tópico foi encontrado'}/>
                            )}
                        </>
                    )}
                </GridItem>
            </Grid>
        </DefaultLayout>
    );
};

export default protectedRoute(ManagerModulePage);