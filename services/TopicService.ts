import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {TopicType} from "../types/Topic.type";
import {AxiosResponse} from "axios";

export function getTopic(prefix: RoutePrefixEnum, disciplineSlug: string, topicSlug: string, ctx: any = null): Promise<AxiosResponse<TopicType>> {
    return generateApi(ctx).get<TopicType>(`/${prefix}/modules/${disciplineSlug}/topics/${topicSlug}/topic`);
}



