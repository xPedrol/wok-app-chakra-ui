import {Module, ModuleType} from "../types/Module.type";

export function toModule(module: any): ModuleType {
    return new Module(module);
}

export function toModules(modules: any[]): ModuleType[] {
    return modules?.map(course => toModule(course));
}