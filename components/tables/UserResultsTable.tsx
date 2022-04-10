import {UserResultType} from "../../types/user/UserResult.type";
import EntityNotFound from "../EntityNotFound";
import {Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tooltip, Tr, Wrap, WrapItem} from "@chakra-ui/react";
import {memo} from "react";

type PageProps = {
    userResults: UserResultType[]
}

const UserResultsTable = ({userResults}: PageProps) => {
    return (
        <>
            {userResults && userResults.length > 0 ? (
                <>
                    <Table>
                        <TableCaption>Lista de desempenho do usuário  <Text as={'span'} color={'blue.300'}>{userResults[0].loginUser}</Text> nos tópicos do módulo selecionado</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Usuário</Th>
                                <Th>Pontos</Th>
                                <Th>Submissõs</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userResults.map(userResult => (
                                <Tr key={`${userResult.loginUser}-${userResult.moduleTopicId}`}>
                                    <Td>{userResult.nameTopic}</Td>
                                    <Td>
                                        <Tooltip
                                            label={`Possui ${userResult.point} ponto(s) de ${userResult.targetScore}`}>
                                            {`${userResult.point}/${userResult.targetScore}`}
                                        </Tooltip>
                                    </Td>
                                    <Td>
                                        <Wrap gap={2}>
                                            <WrapItem>
                                                <Tooltip
                                                    label={`Possui ${userResult.numAresolved} submissões em exercícios de nível A para um total de ${userResult?.numA}.`}>
                                                    <Tag
                                                        colorScheme={'green'}>A: {userResult?.numAresolved} / {userResult?.numA}</Tag>
                                                </Tooltip>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tooltip
                                                    label={`Possui ${userResult.numBresolved} submissões em exercícios de nível B para um total de ${userResult?.numB}.`}>
                                                <Tag
                                                    colorScheme={'blue'}>B: {userResult?.numBresolved} / {userResult?.numB}</Tag>
                                                </Tooltip>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tooltip
                                                    label={`Possui ${userResult.numCresolved} submissões em exercícios de nível C para um total de ${userResult?.numC}.`}>
                                                <Tag
                                                    colorScheme={'orange'}>C: {userResult?.numCresolved} / {userResult?.numC}</Tag>
                                                </Tooltip>
                                            </WrapItem>
                                            <WrapItem>
                                                <Tooltip
                                                    label={`Possui ${userResult.numDresolved} submissões em exercícios de nível D para um total de ${userResult?.numD}.`}>
                                                <Tag
                                                    colorScheme={'red'}>D: {userResult?.numDresolved} / {userResult?.numD}</Tag>
                                                </Tooltip>
                                            </WrapItem>
                                        </Wrap>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </>
            ) : (
                <EntityNotFound textSize={'sm'} iconSize={35}
                                message={'Nenhum resultado de desempenho foi encontrado  para esse usuário'}/>
            )}
        </>
    )
}

export default memo(UserResultsTable)