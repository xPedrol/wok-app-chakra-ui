import {protectedRoute} from "../../../../../../../../../../../HOC/ProtectedRoute";
import DefaultLayout from "../../../../../../../../../../../components/Layouts/DefaultLayout";
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    List,
    ListItem, Spacer,
    Tag,
    Text,
    useColorModeValue,
    VStack,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import CardBox from "../../../../../../../../../../../components/chakraCustom/CardBox";
import {Solution, SolutionType} from "../../../../../../../../../../../types/Solution.type";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {useAuthContext} from "../../../../../../../../../../../contexts/AuthContext";
import {getSolution} from "../../../../../../../../../../../services/SolutionService";
import Scrollbar from "../../../../../../../../../../../components/styledComponents/Scrollbar";
import {Icon} from "@chakra-ui/icons";
import {BiSearchAlt} from "react-icons/bi";
import hljs from 'highlight.js';
import {useEffect, useState} from "react";
import {SolutionFile, SolutionFileType} from "../../../../../../../../../../../types/SolutionFile.type";

type RouterQuery = {
    solutionSlug: string
}
const SolutionPage = () => {
    const [selectedSolutionFile, setSelectedSolutionFile] = useState<SolutionFileType | undefined>(undefined)
    const courseHeadingColor = useColorModeValue('gray.700', 'white');
    const router = useRouter()
    const auth = useAuthContext();
    const {solutionSlug} = router.query as RouterQuery;
    const {data: solution}: { data: SolutionType } = useQuery([solutionSlug, 'solution'], () => {
        return getSolution(solutionSlug).then(res => res.data);
    }, {
        enabled: auth.user.isTeacher()
    })

    const selectSolutionFile = (solutionFile: SolutionFileType) => {
        solutionFile = new SolutionFile(solutionFile);
        setSelectedSolutionFile(solutionFile)
    }
    useEffect(() => {
        hljs.initHighlighting();
    }, [selectedSolutionFile]);
    return (
        <>
            <DefaultLayout title={solution?.name}>
                <Grid templateColumns={'repeat(12,1fr)'} gap={5}>
                    <GridItem colSpan={{base: 12, lg: 4}}>
                        <CardBox>
                            <Flex mb={5} justifyContent={'space-between'}>
                                <Box>
                                    <Heading mb={1}
                                             color={courseHeadingColor}
                                             fontSize={'md'}
                                             fontFamily={'heading'}>
                                        {solution?.name}
                                    </Heading>
                                </Box>
                            </Flex>
                            <Wrap>
                                <WrapItem alignItems={'center'}>
                                    <Tag>Dificulade {solution?.difficultyLevel?.id}</Tag>
                                </WrapItem>
                            </Wrap>
                            <Divider my={5}/>
                            <Text>{solution?.description}</Text>
                        </CardBox>
                        <Spacer mt={5}/>
                        <CardBox>
                            <Flex mb={5} justifyContent={'space-between'}>
                                <Box>
                                    <VStack spacing={0} align={'stretch'}>
                                        <Heading mb={1}
                                                 color={courseHeadingColor}
                                                 fontSize={'md'}
                                                 fontFamily={'heading'}>
                                            Arquivos
                                        </Heading>
                                        <Text fontSize={'xs'}>{solution?.files?.length ?? 0} arquivo(s)</Text>
                                    </VStack>
                                </Box>
                            </Flex>
                            <Box mt={7}>
                                <Scrollbar maxH={'65vh'}>
                                    <List>
                                        {Array.isArray(solution?.files) && solution.files.map((file, i) => (
                                            <ListItem key={i}>
                                                <Box py={2} pr={2}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Heading size={'xs'}>{file.fileName}</Heading>
                                                        <Button size={'sm'}
                                                                onClick={() => selectSolutionFile(file)}>Abrir</Button>
                                                    </Flex>
                                                </Box>
                                                <Divider/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Scrollbar>
                            </Box>
                        </CardBox>
                    </GridItem>
                    <GridItem colSpan={{base: 12, lg: 8}}>
                        <Box>
                            {selectedSolutionFile ? (
                                <>
                                    <VStack align={'start'} spacing={0} mb={5}>
                                        <Heading mb={1}
                                                 color={courseHeadingColor}
                                                 fontSize={'md'}
                                                 fontFamily={'heading'}>
                                            {selectedSolutionFile?.fileName}
                                        </Heading>
                                        <Tag>Linguagem {selectedSolutionFile?.language?.name}</Tag>
                                    </VStack>
                                    <Scrollbar maxH={'70vh'}>
                                        <pre>
                                    <code>
                                {selectedSolutionFile.atob()}
                                        </code>

                            </pre>
                                    </Scrollbar>
                                </>
                            ) : (
                                <Center mt={3}>
                                    <VStack>
                                        <Icon fontSize={'30px'} as={BiSearchAlt}/>
                                        <VStack spacing={0}>
                                            <Text fontWeight={600}>Escolha um arquivo na lista abaixo para
                                                ve-lo.</Text>
                                            <Text fontSize={'sm'} fontWeight={600}>Nenhum arquivo foi
                                                selecionado.</Text>
                                        </VStack>
                                    </VStack>
                                </Center>
                            )}

                        </Box>
                    </GridItem>
                </Grid>
            </DefaultLayout>
        </>
    )
}
export default protectedRoute(SolutionPage)