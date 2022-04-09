import {AuthorTypeEnum} from "../enumerations/AuthorType.enum";
import {AffiliationBasicType} from "./AffiliationBasic.type";
import {UserBasicType} from "../user/UserBasic.type";

export type AuthorBasicType = {
    id: number;
    name?: string;
    slug?: string;
    description?: string;
    authorType?: AuthorTypeEnum;
    email?: string;
    user?: UserBasicType;
    affiliation?: AffiliationBasicType;
}