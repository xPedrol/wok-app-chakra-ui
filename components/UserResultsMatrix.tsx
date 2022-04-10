import {useAuthContext} from "../contexts/AuthContext";
import {useQuery} from "react-query";
import {getUserResultsMxBuModuleId} from "../services/UserResultService";
import {UserResultType} from "../types/user/UserResult.type";
import {
    Avatar,
    Box, Button,
    Divider, Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    List,
    ListItem, Select, Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Loading from "./Loading";
import EntityNotFound from "./EntityNotFound";
import UserResultsTable from "./tables/UserResultsTable";
import CardBox from "./chakraCustom/CardBox";
import {useMemo} from "react";

type PageProps = {
    moduleId: number
}
const UserResultsMatrix = ({moduleId}: PageProps) => {
    const auth = useAuthContext()
    const {data: userResultsMx, isLoading}: {
        data: UserResultType[][],
        isLoading: boolean
    } = useQuery(['userResultsMx', moduleId], () => {
        return getUserResultsMxBuModuleId(auth.getRoutePrefix(), moduleId).then(res => res.data);
    });
    const userList = useMemo(() => {
        if (userResultsMx && userResultsMx.length > 0) {
            const filteredUserResultsMX = userResultsMx.filter(userResults => {
                return !!userResults[0]?.loginUser
            });
            return filteredUserResultsMX.map(userResults => {
                return {userSlug: userResults[0].loginUser, userId: userResults[0].userId};
            })
        } else {
            return []
        }
    }, [userResultsMx]);
    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                    <Stack align={'start'} direction={'row'} mb={4}>
                        <FormControl width={{base: '100%', md: '70%', lg: '50%'}}>
                            <FormLabel htmlFor='students'>Usuários</FormLabel>
                            <Select id='students' placeholder='Selecione um usuário...'>
                                {userList && userList.length > 0 && userList.map(user => (
                                    <option key={user.userId} value={user.userId}>{user.userSlug}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button>Limpar</Button>
                    </Stack>
                    {userResultsMx && userResultsMx.length > 0 ? (
                        <List>
                            {userResultsMx.map(userResults => (
                                <ListItem key={`${module.id}-${userResults[0].loginUser}`}>
                                    <Box py={2} pr={2}>
                                        <HStack alignItems={'center'} key={userResults[0].loginUser}>
                                            <>
                                                <Avatar name={userResults[0].loginUser}/>
                                                <VStack align={'start'} spacing={0}>
                                                    <Heading size={'sm'}>{userResults[0].loginUser}</Heading>
                                                    <Text fontSize={'xs'}
                                                          fontFamily={'body'}>{userResults[0].emailUser}</Text>
                                                </VStack>
                                            </>
                                        </HStack>
                                        <Box mt={3}>
                                            <CardBox>
                                                <UserResultsTable userResults={userResults}/>
                                            </CardBox>
                                        </Box>
                                    </Box>
                                    <Divider my={2}/>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <EntityNotFound iconSize={35} textSize={'sm'}
                                        message={'Nenhum resultado de desempenho foi encontrado'}/>
                    )}
                </>
            )}
        </>
    )
}

export default UserResultsMatrix