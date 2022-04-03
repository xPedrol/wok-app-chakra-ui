import {AxiosResponse} from 'axios';
import {generateApi} from '../config/api';
import {DashboardSummaryType} from '../types/DashboardSummary.type';


export function getAccountSummary(ctx?: any): Promise<AxiosResponse<DashboardSummaryType>> {
    return generateApi(ctx).get('/account/summaryStudent');
}

export function getTeacherSummary(ctx?: any): Promise<AxiosResponse<DashboardSummaryType>> {
    return generateApi(ctx).get('/teacher/summaryStudent');
}
