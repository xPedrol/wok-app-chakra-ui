import {ExerciseBasicType} from "./basics/ExerciseBasic.type";
import {DifficultyLevelBasicType} from "./basics/DifficultyLevelBasic.type";
import {SolutionFileType} from "./SolutionFile.type";

export type SolutionType = {
    id?: number | null;
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    exercise?: ExerciseBasicType | null;
    difficultyLevel?: DifficultyLevelBasicType | null;
    files?: SolutionFileType[] | null;
}

export class Solution implements SolutionType {
    description: string | null;
    difficultyLevel: DifficultyLevelBasicType | null;
    exercise: ExerciseBasicType | null;
    files: SolutionFileType[] | null;
    id: number | null;
    name: string | null;
    slug: string | null;

    constructor(solution: any = {}) {
        this.description = solution.description;
        this.difficultyLevel = solution.difficultyLevel;
        this.exercise = solution.exercise;
        this.files = solution.files;
        this.id = solution.id;
        this.name = solution.name;
        this.slug = solution.slug;
    }

}