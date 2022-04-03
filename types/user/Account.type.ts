import dayjs, {Dayjs} from 'dayjs';
import {AuthorityEnum} from './Authority.type';

export type AccountType = {

    activated?: true
    authorities?: AuthorityEnum[]
    createdBy?: string
    createdDate?: Dayjs
    email?: string
    firstName?: string
    id: number
    imageUrl?: string
    langKey?: string
    lastModifiedBy?: string
    lastModifiedDate?: Dayjs
    lastName?: string
    login?: string
    getHighestAuthority(): AuthorityEnum
    isAdmin(): boolean
    isTeacher(): boolean
    isStudent(): boolean
};

export class Account implements AccountType {
    activated?: true;
    authorities?: AuthorityEnum[];
    createdBy?: string;
    createdDate?: Dayjs;
    email?: string;
    firstName?: string;
    id: number;
    imageUrl?: string;
    langKey?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: Dayjs;
    lastName?: string;
    login?: string;

    constructor(account: any = {}) {
        this.activated = account.activated;
        this.authorities = account.authorities;
        this.createdBy = account.createdBy;
        this.createdDate = account.createdDate ? dayjs(account.createdDate) : undefined;
        this.email = account.email;
        this.firstName = account.firstName;
        this.id = account.id;
        this.imageUrl = account.imageUrl;
        this.langKey = account.langKey;
        this.lastModifiedBy = account.lastModifiedBy;
        this.lastModifiedDate = account.lastModifiedDate ? dayjs(account.lastModifiedDate) : undefined;
        this.lastName = account.lastName;
        this.login = account.login;
    }

    getHighestAuthority(): AuthorityEnum {
        if (this.isAdmin()) {
            return AuthorityEnum.ADMIN;
        }
        if (this.isTeacher()) {
            return AuthorityEnum.TEACHER;
        }
        if (this.isStudent()) {
            return AuthorityEnum.USER;
        }
        return AuthorityEnum.NO_ROLE;
    }

    isAdmin(): boolean {
        return this.authorities.includes(AuthorityEnum.ADMIN);
    }

    isTeacher(): boolean {
        return this.authorities.includes(AuthorityEnum.TEACHER);
    }

    isStudent(): boolean {
        return this.authorities.includes(AuthorityEnum.USER);
    }
}
