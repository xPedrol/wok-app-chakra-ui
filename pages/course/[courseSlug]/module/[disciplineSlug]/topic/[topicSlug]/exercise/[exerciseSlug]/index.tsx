import {protectedRoute} from "../../../../../../../../../HOC/ProtectedRoute";
import DefaultLayout from "../../../../../../../../../components/Layouts/DefaultLayout";
import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading, HStack,
    List,
    ListItem,
    Tag,
    Text,
    useColorModeValue,
    VStack,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import CardBox from "../../../../../../../../../components/chakraCustom/CardBox";
import Loading from "../../../../../../../../../components/Loading";
import {ModuleTopicExerciseType} from "../../../../../../../../../types/ModuleTopicExercise.type";
import {useQuery} from "react-query";
import {getModuleTopicExercise} from "../../../../../../../../../services/ModuleTopicExerciseService";
import {useAuthContext} from "../../../../../../../../../contexts/AuthContext";
import {useRouter} from "next/router";
import {SolutionType} from "../../../../../../../../../types/Solution.type";
import {getSolutions} from "../../../../../../../../../services/SolutionService";
import NextLink from "next/link";
import {SubmissionType} from "../../../../../../../../../types/Submission.type";
import {getSubmissions} from "../../../../../../../../../services/SubmissionService";
import {DATE_CLASSIC_FORMAT} from "../../../../../../../../../dataFormatters/DateFormats";
import {toSubmissions} from "../../../../../../../../../dataFormatters/SubmissionFormatter";
import {AuthorityEnum} from "../../../../../../../../../types/user/Authority.type";
import styles from '../../../../../../../../../styles/Scrollbar.module.scss'
import Scrollbar from "../../../../../../../../../components/styledComponents/Scrollbar";

type RouterQuery = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
    exerciseSlug: string
}
const ExercisePage = () => {
    const courseHeadingColor = useColorModeValue('gray.700', 'white');
    const auth = useAuthContext();
    const router = useRouter();
    const {courseSlug, disciplineSlug, topicSlug, exerciseSlug} = router.query as RouterQuery;
    const {data: moduleTopicExercise}: { data: ModuleTopicExerciseType } = useQuery([courseSlug, disciplineSlug, topicSlug, exerciseSlug, 'moduleTopicExercises'], () => {
        return getModuleTopicExercise(auth.getRoutePrefix(), courseSlug, disciplineSlug, topicSlug, exerciseSlug).then(res => res.data)
    }, {
        enabled: !!(courseSlug && disciplineSlug && topicSlug && exerciseSlug)
    });
    const {data: solutions}: { data: SolutionType } = useQuery([exerciseSlug, 'solutions'], () => {
        return getSolutions(auth.getRoutePrefix(), exerciseSlug).then(res => res.data)
    }, {
        enabled: !!exerciseSlug && auth.user.isTeacher()
    });

    const {data: submissions}: { data: SubmissionType[] } = useQuery([courseSlug, disciplineSlug, topicSlug, exerciseSlug, 'submissions'], () => {
        return getSubmissions(auth.getRoutePrefix(), courseSlug, disciplineSlug, topicSlug, exerciseSlug).then(res => toSubmissions(res.data))
    }, {
        enabled: !!(courseSlug && disciplineSlug && topicSlug && exerciseSlug) && auth.user.getHighestAuthority() === AuthorityEnum.USER
    });
    const getExerciseHTML = () => {
        return {__html: moduleTopicExercise.statement.html}
    }
    return (
        <>
            <DefaultLayout title={moduleTopicExercise?.exercise?.name}>
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
                            {moduleTopicExercise?.statement?.html ? (
                                <div dangerouslySetInnerHTML={getExerciseHTML()}/>
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
                                        {auth.user.isTeacher() ? <>Soluções</> : <>Submissões</>}
                                    </Heading>
                                </Box>
                            </Flex>
                            {auth.user.isTeacher() ? (
                                <>
                                    {Array.isArray(solutions) ? (
                                        <SolutionsList solutions={solutions} courseSlug={courseSlug}
                                                       disciplineSlug={disciplineSlug} topicSlug={topicSlug}
                                                       exerciseSlug={exerciseSlug}/>
                                    ) : (
                                        <Loading/>
                                    )}
                                </>
                            ) : (
                                <>
                                    {Array.isArray(submissions) ? (
                                        <SubmissionsList submissions={submissions} courseSlug={courseSlug}
                                                         disciplineSlug={disciplineSlug} topicSlug={topicSlug}
                                                         exerciseSlug={exerciseSlug}/>
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
type SolutionsListProps = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
    exerciseSlug: string,
    solutions: SolutionType[]
}
const SolutionsList = ({solutions, courseSlug, disciplineSlug, topicSlug, exerciseSlug}: SolutionsListProps) => {
    return (
        <Scrollbar maxH={'65vh'}>
            <List>
                {Array.isArray(solutions) && solutions.map((solution) => (
                    <ListItem key={solution.id}>
                        <Box py={2} pr={2}>
                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                <VStack align='stretch' spacing={0}>
                                    <Heading size={'xs'}>{solution.name}</Heading>
                                    <Text fontSize={'xs'}>{solution?.files?.length ?? 0} Arquivo(s)</Text>
                                </VStack>
                                <Wrap>
                                    <WrapItem alignItems={'center'}>
                                        <Tag colorScheme={'blue'}>Dificuldade: {solution.difficultyLevel.id}</Tag>
                                    </WrapItem>
                                    <WrapItem alignItems={'center'}>
                                        <NextLink
                                            href={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise/${exerciseSlug}/solution/${solution?.slug}`}
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
type SubmissionsListProps = {
    courseSlug: string
    disciplineSlug: string
    topicSlug: string
    exerciseSlug: string,
    submissions: SubmissionType[]
}
const SubmissionsList = ({submissions, courseSlug, disciplineSlug, topicSlug, exerciseSlug}: SubmissionsListProps) => {
    return (
        <List maxH={'65vh'} overflow={'auto'} whiteSpace={'nowrap'} className={styles.scrollbar}>
            {Array.isArray(submissions) && submissions.map((submission) => (
                <ListItem key={submission.id}>
                    <Box py={2} pr={2}>
                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                            <VStack align='stretch' spacing={0}>
                                <Heading size={'xs'}>Resultado: {submission?.runResult?.id}</Heading>
                                <Text fontSize={'xs'}>Pontuação: {submission?.cacheResultScoreTopic}</Text>
                            </VStack>
                            <HStack>
                                {submission.submitTime && (
                                    <Tag colorScheme={'blue'}>{submission.submitTime.format(DATE_CLASSIC_FORMAT)}</Tag>
                                )}
                                <Tag colorScheme={'blue'}>{submission?.language?.id}</Tag>
                                {submission?.cacheResultScoreTopic ? (
                                    <Tag colorScheme={'green'}>Julgado</Tag>
                                ) : (
                                    <Tag colorScheme={'orange'}>Não julgado</Tag>
                                )}
                                <NextLink
                                    href={`/course/${courseSlug}/module/${disciplineSlug}/topic/${topicSlug}/exercise/${exerciseSlug}/solution/${submission?.id}`}
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
    )
}
export default protectedRoute(ExercisePage)