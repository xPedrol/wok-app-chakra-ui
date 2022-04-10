import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {ModuleTopicExerciseType} from "../types/ModuleTopicExercise.type";
import {AxiosResponse} from "axios";

export function getModuleTopicExercise(
    prefix: RoutePrefixEnum,
    courseSlug: string,
    disciplineSlug: string,
    topicSlug: string,
    exerciseSlug: string,
    ctx: any = null
): Promise<AxiosResponse<ModuleTopicExerciseType>> {
    const url = `${prefix}/courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/exercises/${exerciseSlug}`;
    return generateApi(ctx).get<ModuleTopicExerciseType>(url)
}