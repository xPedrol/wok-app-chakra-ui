import {Dayjs} from 'dayjs';
import {DisciplineTypeEnum} from './enumerations/DisciplineType.enum';

export type DisciplineType = {
    id?: number | null;
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    itemorder?: number | null;
    imageUrl?: string | null;
    disciplineType?: DisciplineTypeEnum | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
}
