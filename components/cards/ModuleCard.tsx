import {ModuleBasicType} from "../../types/basics/ModuleBasicType";
import CardBox from "../chakraCustom/CardBox";
import {Avatar, Box, Button, Flex, Heading, HStack, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {useRouter} from "next/router";

type PageProps = {
    module: ModuleBasicType
}
const ModuleCard = ({module}: PageProps) => {
    const router = useRouter();
    const {courseSlug} = router.query;
    return (
        <>
            <CardBox>
                <Flex mb={5} justifyContent={'space-between'}>
                    <Box>
                        <HStack>
                            <Avatar size={'sm'}/>
                            <Heading mb={1}
                                     fontSize={'sm'}
                                     fontFamily={'heading'}>
                                {module.alias}
                            </Heading>
                        </HStack>
                    </Box>
                </Flex>
                <Box>
                    <Text>{module.discipline.shortDescription}</Text>
                    <Stack mt={4} direction={'row'} alignItems={'center'} justifyContent={'end'}>
                        <NextLink href={`/manager/course/${courseSlug}/module/${module.discipline.slug}`} passHref>
                            <Button as={'a'} size={'xs'} colorScheme={'blue'}>Configurações</Button>
                        </NextLink>
                        <NextLink href={`/course/${courseSlug}/module/${module.discipline.slug}`} passHref>
                            <Button as={'a'} size={'xs'} colorScheme={'blue'}>Abrir</Button>
                        </NextLink>
                    </Stack>
                </Box>
            </CardBox>
        </>
    );
};
export default ModuleCard;