import {AxiosResponse} from "axios";
import {UserTeamBasicType} from "../types/basics/UserTeamBasic.type";
import {generateApi} from "../config/api";

export function getUserTeamByAccount(ctx: any = null): Promise<AxiosResponse<UserTeamBasicType[]>> {
    const url = `account/users/teams`;
    return generateApi(ctx).get<UserTeamBasicType[]>(url);
}