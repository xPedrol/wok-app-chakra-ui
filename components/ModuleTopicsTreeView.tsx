import {ModuleTopicType} from '../types/ModuleTopic.type';
import {Box, Flex, Heading, Tag, Text, useColorModeValue} from '@chakra-ui/react';
import styles from '../styles/ModuleTopicsTreeView.module.scss';
import NextImage from 'next/image';
import NextLink from 'next/link'

type PagePros = {
    moduleTopics: ModuleTopicType[][]
    setSelectedModuleTopic: (mT: ModuleTopicType) => void
    baseCardUrl?: string
}
const ModuleTopicsTreeView = ({moduleTopics, setSelectedModuleTopic, baseCardUrl}: PagePros) => {
    const contentBg = useColorModeValue('white', 'gray.900');
    const contentBorderColor = useColorModeValue('gray.300', 'gray.600');
    return (
        <>

            <Box className="timeline" _after={{background: 'green'}}>
                {Array.isArray(moduleTopics) && moduleTopics.map((mTs, i) => (
                    <Box className={`${styles.containerT} ${styles.right}`} mb={{base: 3, md: 0}} key={i}
                         _before={{background: 'none'}}>
                        <Box className={`${styles.date}`} display={{base: 'none', xl: 'block'}}>Nivel {i + 1}</Box>
                        <Heading className={`${styles.icon}`}>{i + 1}</Heading>
                        <Box className={`${styles.content}`} bg={contentBg}
                             border={'1px solid'}
                             borderColor={contentBorderColor}>
                            <Flex justifyContent={'space-around'}>
                                {Array.isArray(mTs) && mTs.map(mT => (
                                    <Box width={{sm: '100%', md: '50%', lg: '25%'}} cursor={'pointer'}
                                         onMouseOver={() => setSelectedModuleTopic(mT)}
                                         onMouseOut={() => setSelectedModuleTopic(undefined)} key={mT.id}
                                         className={`${styles.topicCard}`} textAlign={'center'}>
                                        <NextLink href={`${baseCardUrl}/topic/${mT?.topic?.slug}`} passHref>
                                            <a>
                                                <NextImage className={`${styles.topicImage}`} alt={mT?.topic?.name}
                                                           src={`${process.env.IMAGES_URL}/${mT?.topic?.imageUrl}`}
                                                           width={40} height={40}/>
                                                <Text fontSize={'sm'} fontWeight={700}
                                                      className="mt-3 fw-bold">{mT?.topic?.name}</Text>
                                                {mT?.availableToDo ? (<Tag colorScheme={'green'}>Aberto</Tag>) : (
                                                    <Tag colorScheme={'red'}>Fechado</Tag>)}
                                            </a>
                                        </NextLink>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Box>

        </>
    );
};
export default ModuleTopicsTreeView;
