import {AxiosResponse} from 'axios';
import {AccountType} from '../types/user/Account.type';
import {generateApi} from '../config/api';

export function getAccount(ctx?: any): Promise<AxiosResponse<AccountType>> {
    return generateApi(ctx).get<AccountType>('/account');
}

