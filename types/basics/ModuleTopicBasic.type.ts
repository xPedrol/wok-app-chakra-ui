import {Dayjs} from 'dayjs';

export type ModuleTopicBasicType = {
    id?: number;
    maxGrade?: number;
    targetScore?: number;
    minScore?: number;
    activated?: boolean;
    activeTime?: Dayjs;
    exercices?: ModuleTopicBasicType[];
}
