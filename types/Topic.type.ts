import {Dayjs} from "dayjs";
import {ExerciseBasicType} from "./basics/ExerciseBasic.type";
import {AuthorBasicType} from "./basics/AuthorBasic.type";

export type TopicType = {
    id?: number | null;
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    html?: any | null;
    langKey?: string | null;
    eventUrl?: string | null;
    eventYear?: number | null;
    eventFase?: number | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    pai?: ExerciseBasicType | null;
    author?: AuthorBasicType | null;
}