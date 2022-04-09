import {generateApi} from '../config/api';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {AxiosResponse} from 'axios';
import {ModuleBasicType} from '../types/basics/ModuleBasicType';

export function getModule(prefix: RoutePrefixEnum, courseSlug: string, disciplineSlug: string, ctx: any = null):Promise<AxiosResponse<ModuleBasicType>> {
    return generateApi().get<ModuleBasicType>(`${prefix}/courses/${courseSlug}/disciplines/${disciplineSlug}`);
}
