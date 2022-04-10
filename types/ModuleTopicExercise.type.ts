import {Dayjs} from "dayjs";
import {ModuleTopicBasicType} from "./basics/ModuleTopicBasic.type";
import {DifficultyLevelBasicType} from "./basics/DifficultyLevelBasic.type";
import {ExerciseBasicType} from "./basics/ExerciseBasic.type";
import {StatementType} from "./Statement.type";

export type ModuleTopicExerciseType = {
    id?: number | null;
    alias?: string | null;
    activated?: boolean | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    collor?: string | null;
    lazyEvalResults?: boolean | null;
    allowJudge?: boolean | null;
    allowSubmit?: boolean | null;
    readonly?: boolean | null;
    moduleTopic?: ModuleTopicBasicType | null;
    exercise?: ExerciseBasicType | null;
    statement?: StatementType | null;
    difficultyLevel?: DifficultyLevelBasicType | null;
}