import AuthPagesLayout from '../components/Layouts/AuthPagesLayout';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link as CKLink,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {useState} from 'react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {noAuthRoute} from '../HOC/NoAuthRoute';

function Signup() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <AuthPagesLayout title={'Cadastro'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Registre-se
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Para ter acesso aos cursos e disciplinas
                    </Text>
                </Stack>
                <Box w={'100%'} maxW={'480px'}
                     rounded={'lg'}
                     bg={useColorModeValue('white', 'gray.700')}
                     boxShadow={'lg'}
                     p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text"/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text"/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button type={'submit'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                Sign up
                            </Button>
                        </Stack>
                            <Center>
                                <Link href={'/'} passHref>
                                    <a>
                                        <Text fontSize={'sm'}>Já é um usuário?
                                            <CKLink color={'blue.400'}> Login</CKLink>
                                        </Text>
                                    </a>
                                </Link>
                            </Center>
                    </Stack>
                </Box>
            </Stack>
        </AuthPagesLayout>
    );
}

export default noAuthRoute(Signup);
