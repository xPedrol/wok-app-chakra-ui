import {ExerciseBasicType} from "./basics/ExerciseBasic.type";
import {DifficultyLevelBasicType} from "./basics/DifficultyLevelBasic.type";
import {LanguageKeyEnum} from "./enumerations/LanguageKey.enum";

export type StatementType = {
    id?: number;
    slug?: string;
    html?: any;
    language?: LanguageKeyEnum;
    exercise?: ExerciseBasicType;
    difficultyLevel?: DifficultyLevelBasicType;
    testScenarioDifficultyLevel?: DifficultyLevelBasicType;
}