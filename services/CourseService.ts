import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {generateApi} from '../config/api';
import {CourseType} from '../types/Course.type';
import {CourseStatisticsType} from '../types/CourseStatistics.type';
import {QueryParamsType} from "../types/QueryParams.type";

export function getCourses(prefix: RoutePrefixEnum, showAll: boolean = false, ctx: any = null): Promise<AxiosResponse<CourseType[]>> {
    return generateApi(ctx).get(`${prefix}/courses`, {
        params: {all: showAll}
    });
}

export function getCourseStatistics(prefix: RoutePrefixEnum, courseId: number | string, ctx: any = null): Promise<AxiosResponse<CourseStatisticsType>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseId}/statistics`);
}

export function getCourse(prefix: RoutePrefixEnum, courseIdentify, ctx: any = null): Promise<AxiosResponse<CourseType>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseIdentify}`);
}

export function registerIntoCourse(code: string, userTeamId: string): Promise<AxiosResponse<any>> {
    const url = `account/courses/registrations`;
    return generateApi().get(url, {
        data: {
            codeCourse: code,
            userTeamId: userTeamId
        }
    });
}

export function getPublicCourses(queryParams: QueryParamsType = null, ctx: any = null): Promise<AxiosResponse<CourseType[]>> {
    const url = `public/courses/contests`;
    return generateApi(ctx).get<CourseType[]>(url, {
        params: queryParams
    });
}