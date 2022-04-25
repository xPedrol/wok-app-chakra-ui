import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {UserTeamBasicType} from "../../types/basics/UserTeamBasic.type";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useAuthContext} from "../../contexts/AuthContext";
import {getUserTeamByAccount} from "../../services/UserTeamService";
import {CourseType} from "../../types/Course.type";
import {getPublicCourses, registerIntoCourse} from "../../services/CourseService";
import {useBaseToast} from "../../hooks/ToastbaseHook";

type PageProps = {
    isOpen: boolean
    onClose: () => void
    isPrivateCourse: boolean

}
type Inputs = {
    code: string,
    team: string,
};
const AddCourseDialog = ({isOpen, onClose, isPrivateCourse}: PageProps) => {
    const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm<Inputs>();
    const auth = useAuthContext();
    const toast = useBaseToast();
    const queryClient = useQueryClient()
    const {data: userTeams}: { data: UserTeamBasicType[] } = useQuery([auth.user.id, 'userTeams'], () => {
        return getUserTeamByAccount().then(res => res.data);
    });
    const {data: publicCourses}: { data: CourseType[] } = useQuery('publicCourses', () => {
        return getPublicCourses({size: 100}).then(res => res.data);
    }, {
        enabled: !isPrivateCourse
    });
    const publicCourseSelectChange = (event: any) => {
        if (event.target.value) {
            setValue('code', event.target.value);
        }
    }
    const mutation = useMutation((formData: Inputs) => {
        return registerIntoCourse(formData.code, formData.team)
    }, {
        onSuccess: () => {
            toast({
                title: 'Você se cadastrou com sucesso',
                status: 'success',
            });
            queryClient.invalidateQueries(['dashboardCourses', true]);
            queryClient.invalidateQueries(['dashboardCourses', false]);
        },
        onError: () => {
            toast({
                title: 'Erro ao se cadastrar ao curso',
                status: 'error',
            });
        }
    })
    const onSubmit = (data: Inputs) => {
        mutation.mutate(data)
    }
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Adicionar {isPrivateCourse ? 'curso' : 'treinamento'}</ModalHeader>
                    <ModalCloseButton/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>

                            <Stack direction={'row'} mb={3}>
                                {!isPrivateCourse && (
                                    <FormControl>
                                        <FormLabel htmlFor='publicCourses'>Treinamentos</FormLabel>
                                        <Select id={'publicCourses'} placeholder='Selecione um treinamento...'
                                                onChange={publicCourseSelectChange}>
                                            {Array.isArray(publicCourses) && publicCourses.map(publicCourse => (
                                                <option key={publicCourse.id}
                                                        value={publicCourse.passcode}>{publicCourse.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Stack>
                            <Stack direction={{base: 'column', md: 'row'}} spacing={3}>
                                <FormControl isInvalid={!!errors?.code}>
                                    <FormLabel htmlFor='code'>Código</FormLabel>
                                    <Input id={'code'} type='text' readOnly={!isPrivateCourse}
                                           placeholder={'Código do curso...'} {...register('code', {required: true})} />
                                    <FormErrorMessage>Code is required.</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors?.team}>
                                    <FormLabel htmlFor='teams'>Time</FormLabel>
                                    <Select id={'teams'}
                                            placeholder='Selecione um time...' {...register('team', {required: true})}>
                                        {Array.isArray(userTeams) && userTeams.map(userTeam => (
                                            <option key={userTeam.id}>{userTeam.team.name}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>Team is required.</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme={'green'} type={'submit'}>Cadastrar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddCourseDialog