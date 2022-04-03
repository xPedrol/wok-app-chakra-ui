import {AxiosResponse} from 'axios';
import {generateApi} from '../config/api';
import {DashboardSummaryType} from '../types/DashboardSummary.type';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';


// export function getAccountSummary(ctx?: any): Promise<AxiosResponse<DashboardSummaryType>> {
//     return generateApi(ctx).get('/account/summaryStudent');
// }

export function getSummary(prefix: RoutePrefixEnum, ctx: any = null): Promise<AxiosResponse<DashboardSummaryType>> {
    return generateApi(ctx).get(`/${prefix}/summaryStudent`);
}
