import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {generateApi} from '../config/api';
import {CourseType} from '../types/Course.type';
import {CourseStatisticsType} from '../types/CourseStatistics.type';

export function getCourses(prefix: RoutePrefixEnum, ctx: any = null): Promise<AxiosResponse<CourseType[]>> {
    return generateApi(ctx).get(`${prefix}/courses`);
}

export function getCourseStatistics(prefix: RoutePrefixEnum, courseId: number | string, ctx: any = null): Promise<AxiosResponse<CourseStatisticsType>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseId}/statistics`);
}

export function getCourse(prefix: RoutePrefixEnum, courseIdentify, ctx: any = null): Promise<AxiosResponse<CourseType>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseIdentify}`);
}
