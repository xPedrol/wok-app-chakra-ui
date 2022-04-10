import {UserBasicType} from "../user/UserBasic.type";

export type TeamBasicType = {
    id?: number;
    name?: string;
    slug?: string;
    owner?: UserBasicType;
}