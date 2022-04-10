import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading, HStack,
    List,
    ListItem, Stack,
    Tag,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import DefaultLayout from "../../../../../../../components/Layouts/DefaultLayout";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {getTopic} from "../../../../../../../services/TopicService";
import {useAuthContext} from "../../../../../../../contexts/AuthContext";
import {protectedRoute} from "../../../../../../../HOC/ProtectedRoute";
import NextLink from "next/link";
import CardBox from "../../../../../../../components/chakraCustom/CardBox";
import Loading from "../../../../../../../components/Loading";
import {getExerciseBasics} from "../../../../../../../services/ExerciseService";
import {ExerciseBasicType} from "../../../../../../../types/basics/ExerciseBasic.type";
import {TopicType} from "../../../../../../../types/Topic.type";
import Scrollbar from "../../../../../../../components/styledComponents/Scrollbar";
import EntityNotFound from "../../../../../../../components/EntityNotFound";
import {getExercisePerformanceByAccount} from "../../../../../../../services/UserExercisePerformanceService";
import {UserExercisePerformanceType} from "../../../../../../../types/user/UserExercisePerformance.type";
import {AuthorityEnum} from "../../../../../../../types/user/Authority.type";

type RouterQuery = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
}
const TopicPage = () => {
    const courseHeadingColor = useColorModeValue('gray.700', 'white');
    const courseSubHeadingColor = useColorModeValue('gray.700', 'gray.400');

    const router = useRouter()
    const auth = useAuthContext()
    const {courseSlug, disciplineSlug, topicSlug} = router.query as RouterQuery
    const {data: topic}: { data: TopicType } = useQuery([disciplineSlug, topicSlug, 'topic'], () => {
        return getTopic(auth.getRoutePrefix(), disciplineSlug, topicSlug).then(res => res.data)
    })

    const {
        data: exercises,
        isLoading: isLoadingExercises
    }: { data: ExerciseBasicType[], isLoading: boolean } = useQuery([disciplineSlug, topicSlug, 'exerciseBasics'], () => {
        return getExerciseBasics(auth.getRoutePrefix(), disciplineSlug, topicSlug).then(res => res.data)
    }, {
        enabled: auth.user.isTeacher()
    })

    const {
        data: userExercisePerformances,
        isLoading: isLoadingUserExercisePerformances
    }: { data: UserExercisePerformanceType[], isLoading: boolean } = useQuery([courseSlug, disciplineSlug, topicSlug, 'userExercisePerformances'], () => {
        return getExercisePerformanceByAccount(courseSlug, disciplineSlug, topicSlug).then(res => res.data)
    }, {
        enabled: auth.user.hasOnlyAuthority([AuthorityEnum.USER])
    })

    const getTopicHTML = () => {
        return {__html: topic.html};
    }

    return (
        <>
            <DefaultLayout title={topic?.name}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    <GridItem colSpan={{base:12,lg:7}}>
                        <CardBox>
                            <Flex mb={5} justifyContent={'space-between'}>
                                <Box>
                                    <Heading mb={1}
                                             color={courseHeadingColor}
                                             fontSize={'md'}
                                             fontFamily={'heading'}>
                                        Conteúdo
                                    </Heading>
                                </Box>
                            </Flex>
                            {topic?.html ? (
                                <div dangerouslySetInnerHTML={getTopicHTML()}/>
                            ) : (
                                <Loading/>
                            )}
                        </CardBox>
                    </GridItem>
                    <GridItem colSpan={{base:12,lg:5}}>
                        <Box position={'sticky'} top={3}>
                            <Flex mb={5} justifyContent={'space-between'}>
                                <Box>
                                    <Heading
                                        color={courseHeadingColor}
                                        fontSize={'md'}
                                        fontFamily={'heading'}>
                                        Exercícios
                                    </Heading>
                                </Box>
                            </Flex>
                            {/*auth.user.isTeacher()*/}
                            {auth.user.isTeacher() ? (
                                <>
                                    {isLoadingExercises ? (
                                        <Loading/>
                                    ) : (
                                        <>
                                            {exercises && exercises.length > 0 ? (
                                                <ExerciseBasicsList exercises={exercises} courseSlug={courseSlug}
                                                                    disciplineSlug={disciplineSlug}
                                                                    topicSlug={topicSlug}/>
                                            ) : (
                                                <EntityNotFound textSize={'sm'} iconSize={35}
                                                                message={'Nenhum exercício foi encontrado'}/>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {isLoadingUserExercisePerformances ? (
                                        <Loading/>
                                    ) : (
                                        <>
                                            {userExercisePerformances && userExercisePerformances.length > 0 ? (
                                                <UserExercisePerformancesList
                                                    userEPerformances={userExercisePerformances} courseSlug={courseSlug}
                                                    disciplineSlug={disciplineSlug}
                                                    topicSlug={topicSlug}/>
                                            ) : (
                                                <EntityNotFound textSize={'sm'} iconSize={35}
                                                                message={'Nenhum exercício foi encontrado'}/>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </Box>
                    </GridItem>
                </Grid>
            </DefaultLayout>
        </>
    )
}
type ExerciseBasicsListProps = {
    exercises: ExerciseBasicType[],
    courseSlug: string
    disciplineSlug: string,
    topicSlug: string
}
const ExerciseBasicsList = ({exercises, courseSlug, disciplineSlug, topicSlug}: ExerciseBasicsListProps) => {
    return (
        <Scrollbar maxH={'65vh'}>
            <List>
                {Array.isArray(exercises) && exercises.map((exercise) => (
                    <ListItem key={exercise.id}>
                        <Box py={2} pr={2}>
                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                <Heading size={'xs'}>{exercise.name}</Heading>
                                <Wrap>
                                    <WrapItem alignItems={'center'}>
                                        <Tag colorScheme={'blue'}>Dificuldade: {exercise.difficultyLevelId}</Tag>
                                    </WrapItem>
                                    <WrapItem alignItems={'center'}>
                                        <NextLink
                                            href={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise/${exercise.slug}`}
                                            passHref>
                                            <a>
                                                <Button size={'sm'}>Abrir</Button>
                                            </a>
                                        </NextLink>
                                    </WrapItem>
                                </Wrap>
                            </Flex>
                        </Box>
                        <Divider/>
                    </ListItem>
                ))}
            </List>
        </Scrollbar>
    )
}
type UserExercisePerformancesListProps = {
    userEPerformances: UserExercisePerformanceType[],
    courseSlug: string
    disciplineSlug: string,
    topicSlug: string
}
const UserExercisePerformancesList = ({
                                          userEPerformances,
                                          courseSlug,
                                          disciplineSlug,
                                          topicSlug
                                      }: UserExercisePerformancesListProps) => {
    return (
        <Scrollbar maxH={'65vh'}>
            <List overflowX={'auto'} whiteSpace={'nowrap'}>
                {userEPerformances.map((performance) => (
                    <ListItem key={performance.idExercise}>
                        <Box py={2} pr={2}>
                            <Flex alignItems={'center'} justifyContent={'space-between'} gap={5}>
                                <Heading size={'xs'}>{performance.nameExercise}</Heading>
                                <HStack>
                                    {performance?.idSubmission && (
                                            <Tag colorScheme={'green'}>Resolvido</Tag>
                                    )}
                                    {performance?.nameRunResult && (
                                            <Tag colorScheme={'blue'}>{performance.nameRunResult}</Tag>
                                    )}
                                    {performance?.difficultyLevelId && (
                                            <Tag colorScheme={'blue'}>Dificuldade {performance.difficultyLevelId}</Tag>
                                    )}
                                        <NextLink
                                            href={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise/${performance.slugExercise}`}
                                            passHref>
                                            <a>
                                                <Button size={'sm'}>Abrir</Button>
                                            </a>
                                        </NextLink>
                                </HStack>
                            </Flex>
                        </Box>
                        <Divider/>
                    </ListItem>
                ))}
            </List>
        </Scrollbar>
    )
}
export default protectedRoute(TopicPage);