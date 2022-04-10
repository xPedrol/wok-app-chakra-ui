import {Dayjs} from "dayjs";

export type JudgeHostBasicType = {
    id?: number | null;
    description?: string;
    category?: string;
    active?: boolean;
    polltime?: Dayjs;
    polltimeDisplayed?: string;
    createdDate?: Dayjs;
    createdDateDisplayed?: string;
    lastModifiedDate?: Dayjs;
    lastModifiedDateDisplayed?: string;
}