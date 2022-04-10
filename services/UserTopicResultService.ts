import {AxiosResponse} from "axios";
import {UserTopicPerformanceType} from "../types/user/UserTopicPerformance.type";
import {generateApi} from "../config/api";

export function getUserTopicResultsByTopicId(moduleTopicId: number, ctx: any = null): Promise<AxiosResponse<UserTopicPerformanceType>> {
    const url = `/account/modules/topics/${moduleTopicId}/reportResults`;
    return generateApi(ctx).get<UserTopicPerformanceType>(url);
}