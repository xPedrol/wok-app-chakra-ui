import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {generateApi} from '../config/api';
import {CourseType} from '../types/Course.type';

export function getCourses(prefix: RoutePrefixEnum, ctx: any = null): Promise<AxiosResponse<CourseType[]>> {
    return generateApi(ctx).get(`${prefix}/courses`);
}

export function getCourseStatistics(prefix: RoutePrefixEnum, courseId: number | string, ctx: any = null): Promise<AxiosResponse<any>> {
    return generateApi(ctx).get(`${prefix}/courses/${courseId}/statistics`);
}
