import type {NextPage} from 'next';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link as CKLink,
    Stack,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import AuthPagesLayout from '../components/Layouts/AuthPagesLayout';
import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {AuthRequestType} from '../types/auth/AuthRequest.type';
import {useAuthContext} from '../contexts/AuthContext';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {BiHide, BiShowAlt} from 'react-icons/bi';

const Home: NextPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<AuthRequestType>();
    const auth = useAuthContext();
    const router = useRouter();
    const onSubmit = async (data) => {
        const success = await auth.authenticate(data);
        if (success) {
            router.push('/dashboard');
        }
        // authService.authenticate(data).then(res => {
        //     const token = res.data?.id_token;
        // }).catch((err: AxiosError) => {
        //     if (!toast.isActive(err.message)) {
        //         toast({
        //             id: err.message,
        //             title: err.message,
        //             status: 'error',
        //         });
        //     }
        // });
    };
    const [isPasswordField, setIsPasswordField] = useState<boolean>(true);
    const togglePasswordField = () => {
        const toggledPasswordField = !isPasswordField;
        setIsPasswordField(toggledPasswordField);
    };
    return (
        <>
            <AuthPagesLayout title={'Login'}>
                <Stack alignItems={'center'} direction={{base: 'column', lg: 'row'}} justifyContent={'center'}>
                    <Box mb={{base: 8, lg: 0}}>
                        <VStack alignItems={{base: 'start', lg: 'start'}} justifyContent={{base: 'center'}}>
                            <Image alt={'login_image'} mb={'60px'}
                                   src="https://mundodocodigo.com.br/wp-content/uploads/2021/05/logo-header-261x44.png"
                                   w={'261px'}
                                   h={'44px'}/>
                            <Text fontFamily={'heading'} fontSize={{base: '3xl', lg: '4xl'}} fontWeight={800}
                                  maxW={{base: 500, lg: 600}}>Recruta, faça seu login
                                e
                                junte-se a nós!</Text>
                        </VStack>
                    </Box>
                    <Box width={'100%'} height={'100%'} maxW={'480px'}
                         rounded={'md'}
                         bg={useColorModeValue('white', 'gray.700')}
                         p={{base: 8, sm: 65}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl id="username" isInvalid={!!errors.username}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" {...register('username', {required: true})}
                                           placeholder={'Name...'}/>
                                    <FormErrorMessage>Name is required.</FormErrorMessage>
                                </FormControl>
                                <FormControl id="password" isInvalid={!!errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            pr="4.5rem"
                                            {...register('password', {required: true})}
                                            type={isPasswordField ? 'password' : 'text'}
                                            placeholder={'Password...'}
                                        />
                                        <InputRightElement width="3.5rem">
                                            <Button h="2rem" size="md" variant={'ghost'} onClick={togglePasswordField}>
                                                {isPasswordField ? <BiShowAlt/> : <BiHide/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {/*<Input type="password" {...register('password', {required: true})}*/}
                                    {/*       placeholder={'Password...'}/>*/}
                                    <FormErrorMessage>Password is required.</FormErrorMessage>
                                </FormControl>
                                <Stack spacing={5}>
                                    <Stack
                                        direction={{base: 'column', sm: 'row'}}
                                        align={'start'}
                                        justify={'start'}>
                                        <CKLink color={'blue.400'} fontSize={'md'}>Forgot password?</CKLink>
                                    </Stack>
                                    <Button type={'submit'}
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}
                                            isLoading={auth.isLoading}>
                                        Sign in
                                    </Button>
                                    <Center>
                                        <Link href={'/signup'}><Text fontSize={'sm'}>Não tem uma conta? <CKLink
                                            color={'blue.400'}>registre-se</CKLink></Text></Link>
                                    </Center>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>

            </AuthPagesLayout>
        </>
    );
};

export default Home;
