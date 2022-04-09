import {ReactNode} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {FiChevronDown,} from 'react-icons/fi';
import {CloseIcon, HamburgerIcon, Icon} from '@chakra-ui/icons';
import {useAuthContext} from '../contexts/AuthContext';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {BsMoonFill, BsSun} from 'react-icons/bs';

const Links = [
    {
        title: 'Painel de controle',
        url: '/dashboard'
    },
    {
        title: 'Submissões',
        url: '/submissions'
    }
];
const NavLink = ({children, link}: { children: ReactNode, link: string }) => (
    <NextLink href={link} passHref>
        <Link
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}>
            {children}
        </Link>
    </NextLink>
);

export default function Simple() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode()
    const imagesUrl = process.env.IMAGES_URL;
    const auth = useAuthContext();
    const router = useRouter();
    const logout = () => {
        auth.logout();
        router.push('/');
    };
    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.900')} px={{base: 0, lg: '50px'}}>
                <Container maxW="8xl" px={'50px'}>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <IconButton
                            size={'md'}
                            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                            aria-label={'Open Menu'}
                            display={{md: 'none'}}
                            onClick={isOpen ? onClose : onOpen}
                        />
                        <HStack spacing={8} alignItems={'center'}>
                            <Box fontSize={23} textTransform={'uppercase'} fontWeight={800}>WOK</Box>
                            <HStack
                                as={'nav'}
                                spacing={4}
                                display={{base: 'none', md: 'flex'}} fontSize={'13px'} color={useColorModeValue('gray.600','gray.300')}>
                                {Links.map((link) => (
                                    <NavLink link={link.url} key={link.url}>
                                        {link.title}
                                    </NavLink>
                                ))}
                            </HStack>
                        </HStack>
                        <Flex alignItems={'center'}>
                            <Button onClick={toggleColorMode} variant={'ghost'}>
                                {colorMode === 'light' ? (
                                    // <BsSun size={15} />
                                    <Icon as={BsSun} fontSize={18} />
                                ):(
                                    <Icon as={BsMoonFill} fontSize={18} />
                                )}

                            </Button>
                            {auth.user?.imageUrl && <>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'div'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <HStack>
                                            <Avatar
                                                size={'sm'}
                                                src={`${imagesUrl}/${auth.user.imageUrl}`}
                                            />
                                            <VStack
                                                display={{base: 'none', md: 'flex'}}
                                                alignItems="flex-start"
                                                spacing="1px"
                                                ml="2">
                                                <Text fontSize="sm">{auth.user?.login}</Text>
                                                <Text fontSize="xs" color="gray.600" overflowX={'hidden'} maxW={'7vw'}
                                                      whiteSpace={'nowrap'} textOverflow={'ellipsis'}>
                                                    {auth.user?.email}
                                                </Text>
                                            </VStack>
                                            <Box display={{base: 'none', md: 'flex'}}>
                                                <FiChevronDown/>
                                            </Box>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Perfil</MenuItem>
                                        <MenuDivider/>
                                        <MenuItem onClick={logout}>Deslogar</MenuItem>
                                    </MenuList>
                                </Menu>
                            </>}
                        </Flex>
                    </Flex>
                </Container>
                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.url} link={link.url}>{link.title}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
