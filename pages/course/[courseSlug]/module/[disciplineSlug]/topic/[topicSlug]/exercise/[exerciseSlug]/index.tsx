import {protectedRoute} from "../../../../../../../../../HOC/ProtectedRoute";
import DefaultLayout from "../../../../../../../../../components/Layouts/DefaultLayout";

const ExercisePage = () => {
    return (
        <>
            <DefaultLayout title={'Exercício'}>
                <></>
            </DefaultLayout>
        </>
    )
}

export default protectedRoute(ExercisePage)