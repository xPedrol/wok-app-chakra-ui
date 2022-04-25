import FlexCenterLayout from "../components/Layouts/FlexCenterLayout";
import {Box, Button, Flex, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {WarningTwoIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {getAccount as getAccountS} from "../services/AccountService";
import {getCookie} from "../services/CookieService";
import Loading from "../components/feedback/Loading";

const NotFoundPage = () => {
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const getAccount = async () => {
            return await getAccountS();
        };
        const authCookie = getCookie(process.env.AUTH_COOKIE_KEY);
        if (authCookie) {
            getAccount().then(res => {
                let account = res.data;
                if (account) {
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                }
            });
        }else{
            setIsLogged(false);
        }
    }, []);
    return (
        <FlexCenterLayout title={'Não Encontrado'}>
            <Stack maxW={'600px'}
                boxShadow={'2xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={{base:6,lg:10}}
                spacing={8}
                align={'center'}>
                <WarningTwoIcon boxSize={'60px'} color={'orange.300'}/>
                {/*<Icon as={NotificationIcon} w={24} h={24} />*/}
                <Stack align={'center'} spacing={2}>
                    <Heading
                        fontSize={'2xl'}
                        color={useColorModeValue('gray.800', 'gray.200')} textAlign={'center'}>
                        Pagina não encontrada
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.500'} align={'center'}>
                        {isLogged === true ? (
                            <>A pagina que você está procurando não foi encontrada. Clique no
                                botão abaixo para ser redirecionado à pagina inicial.</>
                        ):(
                            <>A pagina que você está procurando não foi encontrada. Clique no
                                botão abaixo para ser redirecionado à pagina de login.</>
                        )}
                    </Text>
                </Stack>
                <Stack spacing={4} direction={{base: 'column', md: 'row'}} w={'full'} justify={'center'}>
                    {isLogged === undefined ? (
                            <Loading/>
                    ) : (
                        <>
                            {isLogged === true ? (
                                    <Button
                                        bg={'blue.400'}
                                        rounded={'full'}
                                        color={'white'}
                                        flex={'0 0 auto'}
                                        _hover={{bg: 'blue.500'}}
                                        _focus={{bg: 'blue.500'}}>
                                        Painel de Controle
                                    </Button>
                            ) : (
                                <Button
                                    bg={'blue.400'}
                                    rounded={'full'}
                                    color={'white'}
                                    flex={'1 0 auto'}
                                    _hover={{bg: 'blue.500'}}
                                    _focus={{bg: 'blue.500'}}>
                                    Login
                                </Button>
                            )}
                        </>
                    )}

                </Stack>
            </Stack>
        </FlexCenterLayout>
    );
};

export default NotFoundPage;