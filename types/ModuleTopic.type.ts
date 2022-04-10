import {ModuleBasicType} from './basics/ModuleBasicType';
import dayjs, {Dayjs} from 'dayjs';
import {ModuleTopicExerciseBasicType} from './basics/ModuleTopicExerciseBasic.type';
import {ModuleTopicExerciseType} from "./ModuleTopicExercise.type";
import {UserTopicPerformanceType} from "./user/UserTopicPerformance.type";

export type ModuleTopicType = {
    module?: ModuleBasicType | null;
    topic?: any | null;
    id?: number | null;
    maxGrade?: number | null;
    targetScore?: number | null;
    minScore?: number | null;
    activated?: boolean | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    startTime?: Dayjs | null;
    activeTime?: Dayjs | null;
    freezeTime?: Dayjs | null;
    endTime?: Dayjs | null;
    deactiveTime?: Dayjs | null;
    unfreezeTime?: Dayjs | null;
    availableToSee?: boolean | null;
    availableToDo?: boolean | null;
    exercises?: ModuleTopicExerciseBasicType[] | null;
    itemorder?: number | null;
    numAExercisesCached?: number | null;
    numBExercisesCached?: number | null;
    numCExercisesCached?: number | null;
    numDExercisesCached?: number | null;
    maxScoreCached?: number | null;
    statitics?: any | null;
    unresolvedResolved: number | null;

    getTotalExercise(type: string): number
    getUnresolvedResolved(results: UserTopicPerformanceType | any): number;
}

export class ModuleTopic implements ModuleTopicType {
    activated: boolean | null;
    activeTime: Dayjs | null;
    availableToDo: boolean | null;
    availableToSee: boolean | null;
    createdDate: Dayjs | null;
    deactiveTime: Dayjs | null;
    endTime: Dayjs | null;
    exercises: ModuleTopicExerciseType[] | null;
    freezeTime: Dayjs | null;
    id: number | null;
    itemorder: number | null;
    lastModifiedDate: Dayjs | null;
    maxGrade: number | null;
    maxScoreCached: number | null;
    minScore: number | null;
    module: ModuleBasicType | null;
    numAExercisesCached: number | null;
    numBExercisesCached: number | null;
    numCExercisesCached: number | null;
    numDExercisesCached: number | null;
    startTime: Dayjs | null;
    statitics: any;
    targetScore: number | null;
    topic: any;
    unfreezeTime: Dayjs | null;
    unresolvedResolved: number | null;

    constructor(mT: any = {}) {
        this.activated = mT.activated;
        this.activeTime = mT.activeTime ? dayjs(mT.activeTime) : undefined;
        this.createdDate = mT.createdDate ? dayjs(mT.createdDate) : undefined;
        this.deactiveTime = mT.deactiveTime ? dayjs(mT.deactiveTime) : undefined;
        this.endTime = mT.endTime ? dayjs(mT.endTime) : undefined;
        this.exercises = mT.exercises;
        this.freezeTime = mT.freezeTime ? dayjs(mT.freezeTime) : undefined;
        this.id = mT.id;
        this.itemorder = mT.itemorder;
        this.lastModifiedDate = mT.lastModifiedDate ? dayjs(mT.lastModifiedDate) : undefined;
        this.maxGrade = mT.maxGrade ?? 0;
        this.maxScoreCached = mT.maxScoreCached;
        this.minScore = mT.minScore ?? 0;
        this.module = mT.module;
        this.numAExercisesCached = mT.numAExercisesCached;
        this.numBExercisesCached = mT.numBExercisesCached;
        this.numCExercisesCached = mT.numCExercisesCached;
        this.numDExercisesCached = mT.numDExercisesCached;
        this.startTime = mT.startTime ? dayjs(mT.startTime) : undefined;
        this.statitics = mT.statitics;
        this.targetScore = mT.targetScore;
        this.topic = mT.topic;
        this.unfreezeTime = mT.unfreezeTime ? dayjs(mT.unfreezeTime) : undefined;

        if (this.dateActiveCompare()) {
            this.availableToSee = true;
            this.availableToDo = this.dateStartCompare();
        } else {
            this.availableToSee = false;
            this.availableToDo = false;
        }
    }

    getTotalExercise(type: string): number {
        let total = 0;
        if (this.exercises && this.exercises.length > 0) {
            this.exercises.forEach((exercise) => {
                if (exercise.difficultyLevel?.id === type) {
                    total++;
                }
            });
        }
        return total;
    }

    getUnresolvedResolved(results: UserTopicPerformanceType) {
        if (this.exercises) {
            const resolveds = (results.numAresolved ?? 0) + (results.numBresolved ?? 0) + (results?.numCresolved ?? 0) + (results?.numDresolved ?? 0);
            const unresolveds = this.exercises!.length - resolveds;
            return unresolveds < 0 ? 0 : unresolveds;
        }
        return 0;
    }

    public dateActiveCompare(): boolean {
        const currentDate = dayjs(new Date());
        if (this.activeTime && this.deactiveTime) {
            const isAfter = currentDate.isAfter(dayjs(this.activeTime))
            const isBefore = currentDate.isBefore(dayjs(this.deactiveTime));
            return isAfter && isBefore;
        }
        return false;
    }

    public dateEndCompare(): boolean {
        const currentDate = new Date();
        if (this.endTime) {
            return dayjs(this.endTime).isBefore(currentDate);
        }
        return false;
    }

    public dateStartCompare(): boolean {
        const currentDate = dayjs(new Date());
        if (this.startTime && this.endTime) {
            const isAfter = currentDate.isAfter(dayjs(this.startTime))
            const isBefore = currentDate.isBefore(dayjs(this.endTime));
            return isAfter && isBefore;
            // return dayjs(currentDate).isBetween(dayjs(this.startTime), dayjs(this.endTime));
        }
        return false;
    }
}