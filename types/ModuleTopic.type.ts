import {ModuleBasicType} from './basics/ModuleBasicType';
import dayjs, {Dayjs} from 'dayjs';
import {ModuleTopicExerciseBasicType} from './basics/ModuleTopicExerciseBasic.type';
import {ModuleTopicExerciseType} from "./ModuleTopicExercise.type";

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

    getTotalExercise(type: string): number
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

    constructor(mT: any = {}) {
        this.activated = mT.activated;
        this.activeTime = mT.activeTime ? dayjs(mT.activeTime) : undefined;
        this.availableToDo = mT.availableToDo;
        this.availableToSee = mT.availableToSee;
        this.createdDate = mT.createdDate ? dayjs(mT.createdDate) : undefined;
        this.deactiveTime = mT.deactiveTime ? dayjs(mT.deactiveTime) : undefined;
        this.endTime = mT.endTime ? dayjs(mT.endTime) : undefined;
        this.exercises = mT.exercises;
        this.freezeTime = mT.freezeTime ? dayjs(mT.freezeTime) : undefined;
        this.id = mT.id;
        this.itemorder = mT.itemorder;
        this.lastModifiedDate = mT.lastModifiedDate ? dayjs(mT.lastModifiedDate) : undefined;
        this.maxGrade = mT.maxGrade;
        this.maxScoreCached = mT.maxScoreCached;
        this.minScore = mT.minScore;
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
    }

    getTotalExercise(type: string): number {
        let total = 0;
        this.exercises!.forEach((exercise) => {
            if (exercise.difficultyLevel?.id === type) {
                total++;
            }
        });
        return total;
    }
}