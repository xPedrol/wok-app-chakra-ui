import {SolutionType} from "./Solution.type";
import {LanguageBasicType} from "./basics/LanguageBasic.type";
import atob from "atob";
export type SolutionFileType = {
    id?: number | null;
    fileName?: string | null;
    fileMd5?: string | Int32Array | null;
    file?: string | null;
    language?: LanguageBasicType | null;
    solution?: SolutionType | null;
    atob(): string
    btoa(): string
}

export class SolutionFile implements SolutionFileType {
    file: string | null;
    fileMd5: string | Int32Array | null;
    fileName: string | null;
    id: number | null;
    language: LanguageBasicType | null;
    solution: SolutionType | null;


    constructor(solutionFile: any = {}) {
        this.file = solutionFile.file;
        this.fileMd5 = solutionFile.fileMd5;
        this.fileName = solutionFile.fileName;
        this.id = solutionFile.id;
        this.language = solutionFile.language;
        this.solution = solutionFile.solution;
    }


    atob(): string {
        if (this.file) {
            return atob(this.file);
        }
        return '';
    }

    btoa(): string {
        if (this.file) {
            return btoa(this.file);
        }
        return '';
    }
}