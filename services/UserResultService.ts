import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {UserPerformanceType} from "../types/user/UserPerformanceType";
import {AxiosResponse} from "axios";
import {toMatrix} from "../dataFormatters/UserResultFormatter";

export function getUserResultsMxBuModuleId(prefix: RoutePrefixEnum, moduleId: number, ctx: any = null): Promise<AxiosResponse<UserPerformanceType[][]>> {
    const url = `${prefix}/modules/${moduleId}/reportResults`;
    return generateApi(ctx).get<UserPerformanceType[][]>(url).then(res => {
        res.data = toMatrix(res.data)
        return res;
    })
}