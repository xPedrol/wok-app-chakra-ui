import {apiClient} from '../config/api';
import {AxiosResponse} from 'axios';
import {AuthResponseType} from '../types/auth/AuthResponse.type';
import {AuthRequestType} from '../types/auth/AuthRequest.type';


export function authenticate(data: AuthRequestType): Promise<AxiosResponse<AuthResponseType>> {
    return apiClient.post<AuthResponseType>('/authenticate', data);
}
