import axios from 'axios';
import {getCookie} from '../services/CookieService';

export const generateApi = (ctx?: any) => {
    const api = axios.create({
        baseURL: process.env.API_URL
    });
    // api.interceptors.response.use((res) => {
    //     return res;
    // }, (err: AxiosError) => {
    //     const data = err?.response?.data;
    //     if (data) {
    //         return new Error(data);
    //     }
    //     return new Error('Something went wrong');
    // });
    const authKey = process.env.AUTH_COOKIE_KEY;
    const cookie =getCookie(authKey, ctx);
    if (cookie) {
        api.defaults.headers['Authorization'] = `Bearer ${cookie}`;
    }
    return api;
};

export const apiClient = generateApi();
