import {generateApi} from "../config/api";
import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {AxiosResponse} from "axios";
import {ExerciseBasicType} from "../types/basics/ExerciseBasic.type";

export function getExerciseBasics(prefix: RoutePrefixEnum, disciplineSlug: string, topicSlug: string, ctx: any = null): Promise<AxiosResponse<ExerciseBasicType>> {
    return generateApi(ctx).get<ExerciseBasicType>(`${prefix}/modules/${disciplineSlug}/topics/${topicSlug}/exercises`)
}