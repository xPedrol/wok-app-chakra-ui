import dayjs, {Dayjs} from "dayjs";
import {CourseType} from "./Course.type";
import {DisciplineType} from "./Discipline.type";
import {ModuleTopicBasicType} from "./basics/ModuleTopicBasic.type";

export type ModuleType = {
    id?: number | null;
    alias?: string | null;
    activated?: boolean | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    course?: CourseType | null;
    discipline?: DisciplineType | null;
    topics?: ModuleTopicBasicType[] | null;
    topicsM?: ModuleTopicBasicType[][] | null;
}

export class Module implements ModuleType {
    activated: boolean | null;
    alias: string | null;
    course: CourseType | null;
    createdDate: Dayjs | null;
    discipline: DisciplineType | null;
    id: number | null;
    lastModifiedDate: Dayjs | null;
    topics: ModuleTopicBasicType[] | null;
    topicsM: ModuleTopicBasicType[][] | null;

    constructor(module: any = {}) {
        this.activated = module.activated;
        this.alias = module.alias;
        this.course = module.course;
        this.createdDate = module.createdDate ? dayjs(module.createdDate) : undefined;
        this.discipline = module.discipline;
        this.id = module.id;
        this.lastModifiedDate = module.lastModifiedDate ? dayjs(module.lastModifiedDate) : undefined;
        this.topics = module.topics;
        this.topicsM = module.topicsM;
    }

}