import {generateApi} from '../config/api';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {UserRankType} from '../types/user/UserRank.type';

export function getUserTanksByCourse(courseId: number, ctx: any = null): Promise<AxiosResponse<UserRankType[]>> {
    return generateApi(ctx).get<UserRankType[]>(`${RoutePrefixEnum.PUBLIC}/courses/${courseId}/users/courseRank`);
}
