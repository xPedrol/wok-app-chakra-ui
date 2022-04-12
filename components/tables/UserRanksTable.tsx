import {UserRankType} from '../../types/user/UserRank.type';
import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';

type pageProps = {
    userRanks: UserRankType[] | undefined
}
const UserRanksTable = ({userRanks}: pageProps) => {
    return (
        <TableContainer>
            <Table overflowX={'auto'} width={'100%'}>
                <TableCaption>Rank de pontuação dos alunos do curso</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Usuário</Th>
                        <Th>Pontos</Th>
                        <Th>Submissõs</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Array.isArray(userRanks) && userRanks.map(rank => (
                        <Tr key={rank.idUser}>
                            <Td>{rank?.login}</Td>
                            <Td>{rank?.point}</Td>
                            <Td isNumeric>{rank?.totalSub}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
export default UserRanksTable;
