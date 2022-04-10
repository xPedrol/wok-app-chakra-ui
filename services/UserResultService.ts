import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {UserResultType} from "../types/user/UserResult.type";
import {AxiosResponse} from "axios";
import {toMatrix} from "../dataFormatters/UserResultFormatter";

export function getUserResultsMxBuModuleId(prefix: RoutePrefixEnum, moduleId: number, ctx: any = null): Promise<AxiosResponse<UserResultType[][]>> {
    const url = `${prefix}/modules/${moduleId}/reportResults`;
    return generateApi(ctx).get<UserResultType[][]>(url).then(res => {
        res.data = toMatrix(res.data)
        return res;
    })
}