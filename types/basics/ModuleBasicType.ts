import {Dayjs} from 'dayjs';
import {DisciplineType} from '../Discipline.type';

export type ModuleBasicType = {
    id?: number | null;
    alias?: string | null;
    activated?: boolean | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    discipline: DisciplineType | null;
}
