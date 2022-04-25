import {generateApi} from '../config/api';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {ModuleTopicType} from '../types/ModuleTopic.type';


export function getModuleTopicsMtx(prefix: RoutePrefixEnum, courseSlug, disciplineSlug, ctx: any = null): Promise<AxiosResponse<ModuleTopicType[][]>> {
    return generateApi(ctx).get<ModuleTopicType[][]>(`${prefix}/courses/${courseSlug}/modules/${disciplineSlug}/topics`).then((res) => {
        const {data} = res;
        res.data = Object.keys(data).map((key: any) =>
            data ? data[key] : []
        );
        return res;
    });
}

export function getModuleTopics(prefix: RoutePrefixEnum, courseSlug, disciplineSlug, ctx: any = null): Promise<AxiosResponse<ModuleTopicType[]>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseSlug}/modules/${disciplineSlug}/topics`).then((res) => {
        const {data} = res;
        res.data = Object.keys(data).map((key: any) =>
            data ? data[key] : []
        ).reduce(
            (acc, val) => acc.concat(val),
            []
        );
        return res;
    });
}

export function getModuleTopic(prefix: RoutePrefixEnum, courseSlug: string, disciplineSlug: string, topicSlug: string, ctx: any = null): Promise<AxiosResponse<ModuleTopicType>> {
    return generateApi(ctx).get<ModuleTopicType>(`${prefix}/courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}`);
}