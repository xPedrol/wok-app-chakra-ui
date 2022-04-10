import dayjs, {Dayjs} from "dayjs";
import {ExerciseBasicType} from "./basics/ExerciseBasic.type";
import {ModuleTopicExerciseBasicType} from "./basics/ModuleTopicExerciseBasic.type";
import {LanguageBasicType} from "./basics/LanguageBasic.type";
import {JudgeHostBasicType} from "./basics/JudgeHostBasicType";
import {RejudgingBasicType} from "./RejudgingBasic.type";
import {UserTeamBasicType} from "./basics/UserTeamBasic.type";
import {SubmissionFileType} from "./SubmissionFile.type";
import {ScenarioBasicType} from "./basics/ScenarioBasic.type";
import {RunResultType} from "./RunResult.type";

export type SubmissionType = {
    id?: number | null;
    submitTime?: Dayjs | null;
    valid?: boolean | null;
    expectedResults?: string | null;
    entryPoint?: string | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    idSubmmit?: number | null;
    exercise?: ExerciseBasicType | null;
    moduleTopicExercise?: ModuleTopicExerciseBasicType | null;
    language?: LanguageBasicType | null;
    judgehost?: JudgeHostBasicType | null;
    rejudging?: RejudgingBasicType | null;
    userTeam?: UserTeamBasicType | null;
    files?: SubmissionFileType[] | null;
    helpScenario?: ScenarioBasicType | null;
    runPercentA?: number | null;
    runPercentB?: number | null;
    runPercentC?: number | null;
    runPercentD?: number | null;
    runResult?: RunResultType | null;
    cacheResultScoreExercise?: number | null;
    cacheResultScoreTopic?: number | null;
    cacheResultExercise?: string | null;
    cacheResultTopic?: string | null;
}

export class Submission implements SubmissionType {
    cacheResultExercise: string | null;
    cacheResultScoreExercise: number | null;
    cacheResultScoreTopic: number | null;
    cacheResultTopic: string | null;
    createdDate: Dayjs | null;
    entryPoint: string | null;
    exercise: ExerciseBasicType | null;
    expectedResults: string | null;
    files: SubmissionFileType[] | null;
    helpScenario: ScenarioBasicType | null;
    id: number | null;
    idSubmmit: number | null;
    judgehost: JudgeHostBasicType | null;
    language: LanguageBasicType | null;
    lastModifiedDate: Dayjs | null;
    moduleTopicExercise: ModuleTopicExerciseBasicType | null;
    rejudging: RejudgingBasicType | null;
    runPercentA: number | null;
    runPercentB: number | null;
    runPercentC: number | null;
    runPercentD: number | null;
    runResult: RunResultType | null;
    submitTime: Dayjs | null;
    userTeam: UserTeamBasicType | null;
    valid: boolean | null;

    constructor(submission: any = {}) {
        this.cacheResultExercise = submission.cacheResultExercise;
        this.cacheResultScoreExercise = submission.cacheResultScoreExercise;
        this.cacheResultScoreTopic = submission.cacheResultScoreTopic;
        this.cacheResultTopic = submission.cacheResultTopic;
        this.createdDate = submission.createdDate?dayjs(submission.createdDate):undefined;
        this.entryPoint = submission.entryPoint;
        this.exercise = submission.exercise;
        this.expectedResults = submission.expectedResults;
        this.files = submission.files;
        this.helpScenario = submission.helpScenario;
        this.id = submission.id;
        this.idSubmmit = submission.idSubmmit;
        this.judgehost = submission.judgehost;
        this.language = submission.language;
        this.lastModifiedDate = submission.lastModifiedDate?dayjs(submission.lastModifiedDate):undefined;
        this.moduleTopicExercise = submission.moduleTopicExercise;
        this.rejudging = submission.rejudging;
        this.runPercentA = submission.runPercentA;
        this.runPercentB = submission.runPercentB;
        this.runPercentC = submission.runPercentC;
        this.runPercentD = submission.runPercentD;
        this.runResult = submission.runResult;
        this.submitTime = submission.submitTime?dayjs(submission.submitTime):undefined;
        this.userTeam = submission.userTeam;
        this.valid = submission.valid;
    }

}