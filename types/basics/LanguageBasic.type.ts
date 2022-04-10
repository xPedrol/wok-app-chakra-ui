import {Dayjs} from "dayjs";

export type LanguageBasicType = {
    id?: string | null;
    langid?: string | null;
    name?: string | null;
    extensions?: Array<string> | null;
    requireEntryPoint?: boolean | null;
    entryPointDescription?: string | null;
    allowSubmit?: boolean | null;
    allowJudge?: boolean | null;
    timeFactor?: number | null;
    filterCompilerFiles?: boolean | null;
    createdDate?: Dayjs | null;
    lastModifiedDate?: Dayjs | null;
    compileScriptId?: string | null;
}