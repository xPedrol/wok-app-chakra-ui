import {ModuleTopic, ModuleTopicType} from "../types/ModuleTopic.type";

export function toModuleTopic(moduleTopic: any): ModuleTopicType {
    return new ModuleTopic(moduleTopic);
}

export function toModuleTopics(moduleTopics: any[]): ModuleTopicType[] {
    return moduleTopics?.map(course => toModuleTopic(course));
}

export function toModuleTopicsMx(moduleTopics: any[][]): ModuleTopicType[][] {
    return moduleTopics?.map(mTs => toModuleTopics(mTs))
}
