import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {SubmissionType} from "../types/Submission.type";
import {AxiosResponse} from "axios";

export function getSubmissions(
    prefix: RoutePrefixEnum,
    courseSlug: string,
    disciplineSlug: string,
    topicSlug: string,
    exerciseSlug: string,
    ctx: any = null
): Promise<AxiosResponse<SubmissionType[]>> {
    const url = `${RoutePrefixEnum.ACCOUNT}/courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/exercises/${exerciseSlug}/submissions`;
    return generateApi(ctx).get<SubmissionType[]>(url)
}