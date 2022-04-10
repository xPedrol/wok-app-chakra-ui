import {Dayjs} from "dayjs";

export type RunResultType = {
    createdDate?: Dayjs;
    description?: string;
    minLength?: number;
    maxLength?: number;
    id?: string;
    lastModifiedDate?: Dayjs;
    name?: string;
}