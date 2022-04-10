import {generateApi} from "../config/api";
import {AxiosResponse} from "axios";
import {UserExercisePerformanceType} from "../types/user/UserExercisePerformance.type";

export function getExercisePerformanceByAccount(courseSlug: string,disciplineSlug: string, topicSlug: string, ctx: any = null): Promise<AxiosResponse<UserExercisePerformanceType[]>> {
    return generateApi(ctx).get<UserExercisePerformanceType[]>(`/account/disciplines/${disciplineSlug}/courses/${courseSlug}/topics/${topicSlug}/submissions/studentResults`)
}