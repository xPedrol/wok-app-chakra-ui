import {Dayjs} from "dayjs";

export type RejudgingBasicType = {
    id?: number;
    useridStart?: number;
    useridFinish?: number;
    starttime?: number;
    endtime?: number;
    reason?: string;
    valid?: boolean;
    createdDate?: Dayjs;
    lastModifiedDate?: Dayjs;
}