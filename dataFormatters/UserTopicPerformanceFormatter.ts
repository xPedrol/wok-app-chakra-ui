import {UserTopicPerformance, UserTopicPerformanceType} from "../types/user/UserTopicPerformance.type";

export function toUserTopicPerformance(performance: any): UserTopicPerformanceType {
    return new UserTopicPerformance(performance);
}

export function toUserTopicPerformances(performances: any[]): UserTopicPerformanceType[] {
    return performances?.map(performance => {
        return toUserTopicPerformance(performance);
    });
}