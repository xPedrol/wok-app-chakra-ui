import {UserBasicType} from "../user/UserBasic.type";
import {TeamBasicType} from "./TeamBasic.type";

export type UserTeamBasicType = {
    id?: number;
    user?: UserBasicType;
    team?: TeamBasicType;
}