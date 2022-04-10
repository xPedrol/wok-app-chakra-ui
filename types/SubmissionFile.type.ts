import {Dayjs} from "dayjs";

export type SubmissionFileType = {
    id?: number | null;
    name?: string | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    extension?: string | null;
    solutionFile?: string | null;
}