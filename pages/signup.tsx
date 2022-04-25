import FlexCenterLayout from '../components/Layouts/FlexCenterLayout';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
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
        <FlexCenterLayout title={'Cadastro'}>
            <Stack alignItems={'center'} direction={'column'} justifyContent={'center'} width={{base:'100%',md:'unset'}}>
                <Box mb={{base: 4, lg: 0}}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Registre-se
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Para ter acesso aos cursos e disciplinas
                        </Text>
                    </Stack>
                </Box>
                <Box width={'100%'} height={'100%'} maxW={'480px'}
                     rounded={'md'}
                     bg={useColorModeValue('white', 'gray.700')}
                     p={{base: 8, sm: 65}}>
                    <Stack spacing={4}>
                        <Stack direction={{base: 'column', lg: 'row'}}>
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
                        </Stack>
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
                                        <CKLink as={'span'} color={'blue.400'}> Login</CKLink>
                                    </Text>
                                </a>
                            </Link>
                        </Center>
                    </Stack>
                </Box>
            </Stack>
        </FlexCenterLayout>
    );
}

export default noAuthRoute(Signup);
