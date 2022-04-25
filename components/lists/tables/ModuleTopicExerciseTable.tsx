import {
    Button,
    Checkbox,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import NextLink from "next/link";
import {ModuleTopicExerciseType} from "../../../types/ModuleTopicExercise.type";

type PageProps = {
    mTExercises: ModuleTopicExerciseType[]
    openingUrl?: string
    settingsUrl?: string
}
const ModuleTopicExerciseTable = ({mTExercises, settingsUrl, openingUrl}: PageProps) => {
    return (
        <>
            <TableContainer>
                <Table overflowX={'auto'} width={'100%'}>
                    <TableCaption>Listagem de exercícios</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Ativo</Th>
                            <Th>Submissões</Th>
                            <Th>Julgamento</Th>
                            <Th>Apelido</Th>
                            <Th>Exercício</Th>
                            <Th>Dificuldade</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {mTExercises.map(mTExercise => (
                            <Tr key={mTExercise.id}>
                                <Td>
                                    <Checkbox colorScheme="blue" size={'lg'} checked={mTExercise.activated}/>
                                </Td>
                                <Td>
                                    <Checkbox colorScheme="blue" size={'lg'} checked={mTExercise.allowSubmit}/>
                                </Td>
                                <Td>
                                    <Checkbox colorScheme="blue" size={'lg'} checked={mTExercise.allowJudge}/>
                                </Td>
                                <Td textAlign={'center'}>{mTExercise.alias}</Td>
                                <Td>{mTExercise.exercise.name}</Td>
                                <Td>{mTExercise.difficultyLevel.id}</Td>
                                <Td>
                                    <Wrap gap={3} justify={'end'}>
                                        {settingsUrl && (
                                            <WrapItem>
                                                <NextLink href={`${settingsUrl}/${mTExercise.exercise.slug}`} passHref>
                                                    <Button as={'a'} size={'sm'}>Configurações</Button>
                                                </NextLink>
                                            </WrapItem>
                                        )}
                                        {openingUrl && (
                                            <WrapItem>
                                                <NextLink href={`${openingUrl}/${mTExercise.exercise.slug}`} passHref>
                                                    <Button as={'a'} size={'sm'}>Abrir</Button>
                                                </NextLink>
                                            </WrapItem>
                                        )}
                                    </Wrap>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ModuleTopicExerciseTable;