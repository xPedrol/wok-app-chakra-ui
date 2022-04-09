import {
    Avatar,
    Box, Button, Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    List,
    ListItem, Tag,
    Text,
    Tooltip,
    useColorModeValue, Wrap, WrapItem
} from "@chakra-ui/react";
import DefaultLayout from "../../../../../../../components/Layouts/DefaultLayout";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {getTopic} from "../../../../../../../services/TopicService";
import {useAuthContext} from "../../../../../../../contexts/AuthContext";
import {protectedRoute} from "../../../../../../../HOC/ProtectedRoute";
import {DATE_CLASSIC_FORMAT} from "../../../../../../../dataFormatters/DateFormats";
import NextLink from "next/link";
import CardBox from "../../../../../../../components/chakraCustom/CardBox";
import Loading from "../../../../../../../components/Loading";
import {getExerciseBasics} from "../../../../../../../services/ExerciseService";
import {ExerciseBasicType} from "../../../../../../../types/basics/ExerciseBasic.type";
import {TopicType} from "../../../../../../../types/Topic.type";

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

    const {data: exercises}: { data: ExerciseBasicType[] } = useQuery([disciplineSlug, topicSlug, 'exerciseBasics'], () => {
        return getExerciseBasics(auth.getRoutePrefix(), disciplineSlug, topicSlug).then(res => res.data)
    }, {
        enabled: auth.user.isTeacher()
    })
    const getTopicHTML = () => {
        return {__html: topic.html};
    }

    return (
        <>
            <DefaultLayout title={topic?.name}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    <GridItem colSpan={7}>
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
                    <GridItem colSpan={5}>
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
                            {auth.user.isTeacher() && (
                                <>
                                    {Array.isArray(exercises) ? (
                                        <ExerciseBasicsList exercises={exercises} courseSlug={courseSlug}
                                                            disciplineSlug={disciplineSlug} topicSlug={topicSlug}/>
                                    ) : (
                                        <Loading/>
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
    topicSlug:string
}
const ExerciseBasicsList = ({exercises, courseSlug, disciplineSlug,topicSlug}: ExerciseBasicsListProps) => {
    return (
        <List maxH={'65vh'} overflow={'auto'}>
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
    )
}
export default protectedRoute(TopicPage);