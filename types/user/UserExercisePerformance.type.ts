import {Dayjs} from "dayjs";

export type UserExercisePerformanceType = {
    submitTime: Dayjs;
    difficultyLevelId: string;
    runPercentA: number;
    runPercentB: number;
    runPercentC: number;
    runPercentD: number;
    starts: number;
    cacheResultScoreExercise: number;
    cacheResultScoreTopic: number;
    cacheResultLevelExercise: string;
    cacheResultLevelTopic: string;
    color: string;
    icon: string;
    answer: string;
    idSubmission: number;
    nameExercise: string;
    idExercise: number;
    slugExercise: string;
    idRunResult: string;
    nameRunResult: string;
    descriptionExercise: string;
    descriptionRunResult: string;
}