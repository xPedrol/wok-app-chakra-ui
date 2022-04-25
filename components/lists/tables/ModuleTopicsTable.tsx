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
import {ModuleTopicType} from "../../../types/ModuleTopic.type";
import {DATE_CLASSIC_FORMAT_WITH_HOURS} from "../../../dataFormatters/DateFormats";
import NextLink from "next/link";

type PageProps = {
    moduleTopics: ModuleTopicType[]
    openingUrl?: string
    settingsUrl?: string
}

const ModuleTopicsTable = ({moduleTopics, settingsUrl, openingUrl}: PageProps) => {
    return (
        <TableContainer>
            <Table overflowX={'auto'} width={'100%'}>
                <TableCaption>Listagem de tópicos</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Ativo</Th>
                        <Th>Tópico</Th>
                        <Th>Pontuação max.</Th>
                        <Th>Pontuação min.</Th>
                        <Th>Média</Th>
                        <Th>Dt. início</Th>
                        <Th>Dt. término</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {moduleTopics.map(moduleTopic => (
                        <Tr key={moduleTopic.id}>
                            <Td>
                                <Checkbox colorScheme="blue" size={'lg'} checked={moduleTopic.activated}/>
                            </Td>
                            <Td>{moduleTopic.topic.name}</Td>
                            <Td textAlign={'center'}>{moduleTopic.maxGrade}</Td>
                            <Td textAlign={'center'}>{moduleTopic?.minScore}</Td>
                            <Td textAlign={'center'}>{moduleTopic?.targetScore}</Td>
                            <Td>{moduleTopic.startTime.format(DATE_CLASSIC_FORMAT_WITH_HOURS)}</Td>
                            <Td>{moduleTopic.endTime.format(DATE_CLASSIC_FORMAT_WITH_HOURS)}</Td>
                            <Td>
                                <Wrap gap={3} justify={'end'}>
                                    {settingsUrl && (
                                        <WrapItem>
                                            <NextLink href={`${settingsUrl}/${moduleTopic.topic.slug}`} passHref>
                                                <Button as={'a'} size={'sm'}>Configurações</Button>
                                            </NextLink>
                                        </WrapItem>
                                    )}
                                    {openingUrl && (
                                        <WrapItem>
                                            <NextLink href={`${openingUrl}/${moduleTopic.topic.slug}`} passHref>
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
    );
};
export default ModuleTopicsTable;