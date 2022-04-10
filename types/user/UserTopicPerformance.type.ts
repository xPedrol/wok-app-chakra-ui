import {UserBasicType} from "./UserBasic.type";
import {TopicType} from "../Topic.type";

export type UserTopicPerformanceType = {
    maxGrade?: number | null;
    minScore?: number | null;
    point?: number | null;
    targetScore?: number | null;
    user?: UserBasicType | null;
    topic?: TopicType | null;
    idModuleTopic?: number | null;
    numA?: number | null;
    numB?: number | null;
    numC?: number | null;
    numD?: number | null;
    numAresolved?: number | null;
    numBresolved?: number | null;
    numCresolved?: number | null;
    numDresolved?: number | null;
}

export class UserTopicPerformance implements UserTopicPerformanceType {
    idModuleTopic: number | null;
    maxGrade: number | null;
    minScore: number | null;
    numA: number | null;
    numAresolved: number | null;
    numB: number | null;
    numBresolved: number | null;
    numC: number | null;
    numCresolved: number | null;
    numD: number | null;
    numDresolved: number | null;
    point: number | null;
    targetScore: number | null;
    topic: TopicType | null;
    user: UserBasicType | null;

    constructor(userTopicPerformance: any = {}) {
        this.idModuleTopic = userTopicPerformance.idModuleTopic;
        this.maxGrade = userTopicPerformance.maxGrade??0;
        this.minScore = userTopicPerformance.minScore??0;
        this.numA = userTopicPerformance.numA??0;
        this.numAresolved = userTopicPerformance.numAresolved??0;
        this.numB = userTopicPerformance.numB??0;
        this.numBresolved = userTopicPerformance.numBresolved??0;
        this.numC = userTopicPerformance.numC??0;
        this.numCresolved = userTopicPerformance.numCresolved??0;
        this.numD = userTopicPerformance.numD??0;
        this.numDresolved = userTopicPerformance.numDresolved??0;
        this.point = userTopicPerformance.point??0;
        this.targetScore = userTopicPerformance.targetScore??0;
        this.topic = userTopicPerformance.topic??0;
        this.user = userTopicPerformance.user??0;
    }

}