import {RoutePrefixEnum} from "../types/enumerations/RoutePrefix.enum";
import {generateApi} from "../config/api";
import {SolutionType} from "../types/Solution.type";
import {AxiosResponse} from "axios";

export function getSolutions(prefix: RoutePrefixEnum, exerciseSlug: string, ctx: any = null): Promise<AxiosResponse<SolutionType>> {
    const url = `${prefix}/exercises/${exerciseSlug}/solutions`;
    return generateApi(ctx).get<SolutionType>(url);
}

export function getSolution(solutionSlug: string, ctx: any = null): Promise<AxiosResponse<SolutionType>> {
    const url = `teacher/exercises/solutions/${solutionSlug}`;
    return generateApi(ctx).get<SolutionType>(url);
}