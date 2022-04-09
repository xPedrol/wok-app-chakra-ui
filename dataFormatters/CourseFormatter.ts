import {Course, CourseType} from '../types/Course.type';

export function toCourse(course: any): CourseType {
    return new Course(course);
}

export function toCourses(courses: any[]): CourseType[] {
    return courses?.map(course => {
        return toCourse(course);
    });
}
