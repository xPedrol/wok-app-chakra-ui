import {AffiliationBasicType} from './AffiliationBasic.type';
import {CourseTypeEnum} from './enumerations/CourseType.enum';
import dayjs, {Dayjs} from 'dayjs';
import {UserBasicType} from './user/UserBasic.type';

export type CourseType = {
    activated: boolean;
    affiliation: AffiliationBasicType
    courseType: CourseTypeEnum
    createdDate: Dayjs
    description: string
    endDate: Dayjs
    id: number
    lastModifiedDate: Dayjs
    modules: any
    name: string
    passcode: string
    slug: string
    startDate: Dayjs
    teacher: UserBasicType
    isPublic(): boolean
    isPrivate(): boolean
    isTest(): boolean
}

export class Course implements CourseType {
    activated: boolean;
    affiliation: AffiliationBasicType;
    courseType: CourseTypeEnum;
    createdDate: Dayjs;
    description: string;
    endDate: Dayjs;
    id: number;
    lastModifiedDate: Dayjs;
    modules: any;
    name: string;
    passcode: string;
    slug: string;
    startDate: Dayjs;
    teacher: UserBasicType;

    constructor(course: any = {}) {
        this.activated = course.activated;
        this.affiliation = course.affiliation;
        this.courseType = course.courseType;
        this.createdDate = course.createdDate ? dayjs(course.createdDate) : undefined;
        this.description = course.description;
        this.endDate = course.endDate ? dayjs(course.endDate) : undefined;
        this.id = course.id;
        this.lastModifiedDate = course.lastModifiedDate ? dayjs(course.lastModifiedDate) : undefined;
        this.modules = course.modules;
        this.name = course.name;
        this.passcode = course.passcode;
        this.slug = course.slug;
        this.startDate = course.startDate ? dayjs(course.startDate) : undefined;
        this.teacher = course.teacher;
    }

    isPublic(): boolean {
        return this.courseType === CourseTypeEnum.PUBLIC;
    }

    isPrivate(): boolean {
        return this.courseType === CourseTypeEnum.PRIVATE;
    }

    isTest(): boolean {
        return this.courseType === CourseTypeEnum.TEST;
    }
}
