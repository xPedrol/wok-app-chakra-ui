import {protectedRoute} from "../../../../HOC/ProtectedRoute";
import {AuthorityEnum} from "../../../../types/user/Authority.type";
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import {
    Box,
    Button,
    Code,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    List,
    ListItem, SimpleGrid,
    Tag,
    Text,
    useColorModeValue,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {DATE_CLASSIC_FORMAT_WITH_HOURS, DATE_TIME_LOCAL} from "../../../../dataFormatters/DateFormats";
import CardBox from "../../../../components/chakraCustom/CardBox";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {useAuthContext} from "../../../../contexts/AuthContext";
import {getCourse} from "../../../../services/CourseService";
import {toCourse} from "../../../../dataFormatters/CourseFormatter";
import Loading from "../../../../components/feedback/Loading";
import EntityNotFound from "../../../../components/feedback/EntityNotFound";
import {useForm} from "react-hook-form";
import {CourseType} from "../../../../types/Course.type";
import ModuleCard from "../../../../components/cards/ModuleCard";
import Scrollbar from "../../../../components/styledComponents/Scrollbar";

type RouterQuery = {
    courseSlug: string
}

type Inputs = {
    startDate: string
    endDate: string
    passcode: string
}
const ManagerCoursePage = () => {
    const courseHeadingColor = useColorModeValue('gray.700', 'white');
    const router = useRouter();
    const {courseSlug} = router.query as RouterQuery;
    const {getRoutePrefix} = useAuthContext();
    const {data: course, isLoading: isLoadingCourse} = useQuery([courseSlug, 'course'], () => {
            return getCourse(getRoutePrefix(), courseSlug).then(res => toCourse(res.data));
        },
        {
            onSuccess: (data) => {
                updateFields(data);
            },
            refetchOnWindowFocus: false
        });
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
    };
    const updateFields = (course: CourseType) => {
        setValue('startDate', course.startDate.format(DATE_TIME_LOCAL));
        setValue('endDate', course.endDate.format(DATE_TIME_LOCAL));
        setValue("passcode", course.passcode);
    };
    return (
        <>
            <DefaultLayout title={course?.name}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    <GridItem colSpan={{base: 12, lg: 4}}>
                        {isLoadingCourse ? (
                            <Loading/>
                        ) : (
                            <>
                                {course ? (
                                    <CardBox>
                                        <Flex mb={5} justifyContent={'space-between'}>
                                            <Box>
                                                <Heading mb={1}
                                                         color={courseHeadingColor}
                                                         fontSize={'md'}
                                                         fontFamily={'heading'}>
                                                    {course?.name}
                                                </Heading>
                                            </Box>
                                        </Flex>
                                        <Box>
                                            <Text>{course?.description}</Text>
                                            <Wrap gap={2} justify={'center'} mt={5}>
                                                <WrapItem>
                                                    <Tag
                                                        colorScheme={'blue'}>In??cio: {course.startDate.format(DATE_CLASSIC_FORMAT_WITH_HOURS)}</Tag>
                                                </WrapItem>
                                                <WrapItem>
                                                    <Tag
                                                        colorScheme={'blue'}>T??rmino: {course.endDate.format(DATE_CLASSIC_FORMAT_WITH_HOURS)}</Tag>
                                                </WrapItem>
                                            </Wrap>
                                        </Box>
                                        <Box mt={5}>
                                            <List>
                                                <ListItem>
                                                    <Box py={2} pr={2}>
                                                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                            <Heading size={'xs'}>Tipo</Heading>
                                                            <Code colorScheme="blue">{course.courseType}</Code>
                                                        </Flex>
                                                    </Box>
                                                    <Divider/>
                                                </ListItem>
                                                <ListItem>
                                                    <Box py={2} pr={2}>
                                                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                            <Heading size={'xs'}>Institui????o</Heading>
                                                            <Code colorScheme="blue">{course.affiliation.name}</Code>
                                                        </Flex>
                                                    </Box>
                                                    <Divider/>
                                                </ListItem>
                                                <ListItem>
                                                    <Box py={2} pr={2}>
                                                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                            <Heading size={'xs'}>C??digo de acesso</Heading>
                                                            <Code colorScheme="blue">{course.passcode}</Code>
                                                        </Flex>
                                                    </Box>
                                                    <Divider/>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </CardBox>
                                ) : (
                                    <EntityNotFound message={'Curso n??o encontrado'}/>
                                )}
                            </>
                        )}

                    </GridItem>
                    <GridItem colSpan={{base: 12, lg: 8}}>
                        {isLoadingCourse ? (
                            <Loading/>
                        ) : (
                            <>
                                {course && (
                                    <CardBox>
                                        <Flex mb={5} justifyContent={'space-between'}>
                                            <Box>
                                                <Heading mb={1}
                                                         color={courseHeadingColor}
                                                         fontSize={'md'}
                                                         fontFamily={'heading'}>
                                                    Informa????es Gerais
                                                </Heading>
                                            </Box>
                                        </Flex>
                                        <Box>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Grid templateColumns={'repeat(12,1fr)'} gap={4}>
                                                    <GridItem colSpan={{base: 12, md: 4}}>
                                                        <FormControl>
                                                            <FormLabel htmlFor="startDate">Data de in??cio</FormLabel>
                                                            <Input id="startDate"
                                                                   type="datetime-local" {...register("startDate")}/>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem colSpan={{base: 12, md: 4}}>
                                                        <FormControl>
                                                            <FormLabel htmlFor="endDade">Data de t??rmino</FormLabel>
                                                            <Input id="endDade"
                                                                   type="datetime-local"  {...register("endDate")}/>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem colSpan={{base: 12, md: 4}}>
                                                        <FormControl>
                                                            <FormLabel htmlFor="passcode">C??digo de acesso</FormLabel>
                                                            <Input id="passcode"
                                                                   type="text"  {...register("passcode")}/>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem colSpan={{base: 12}} justifySelf={'end'}>
                                                        <Button colorScheme={'blue'} type={'submit'}>Salvar</Button>
                                                    </GridItem>
                                                </Grid>
                                            </form>
                                        </Box>
                                    </CardBox>
                                )}
                            </>
                        )}
                    </GridItem>
                    {(course?.modules && course.modules.length > 0) && (
                        <GridItem colSpan={12}>
                            <Flex mb={5} justifyContent={'space-between'}>
                                <Box>
                                    <Heading mb={1}
                                             color={courseHeadingColor}
                                             fontSize={'md'}
                                             fontFamily={'heading'}>
                                        M??dulos
                                    </Heading>
                                </Box>
                            </Flex>
                            <Scrollbar maxH={'45vw'}>
                                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={5} mr={2}>
                                    {course.modules.map(module => (
                                        <Box key={module.id}> <ModuleCard module={module}/></Box>
                                    ))}
                                </SimpleGrid>
                            </Scrollbar>

                        </GridItem>
                    )}
                </Grid>
            </DefaultLayout>
        </>
    );
};
export default protectedRoute(ManagerCoursePage, [AuthorityEnum.TEACHER, AuthorityEnum.ADMIN]);