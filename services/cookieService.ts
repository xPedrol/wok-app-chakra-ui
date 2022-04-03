import {destroyCookie, parseCookies, setCookie as setNCookies} from 'nookies';
import {CookieSerializeOptions} from 'cookie';
import dayjs from 'dayjs';

export function getCookie(name: string, ctx?: any) {
    const cookies = parseCookies(ctx);
    const cookie = cookies[name];
    if (cookie) {
        return cookie;
    } else {
        return null;
    }
}

export function setCookie(name: string, value: any, options?: CookieSerializeOptions) {
    options = options ?? {};
    options.expires = options?.expires ?? dayjs().add(1, 'days').toDate();
    setNCookies(null, name, value, options);
}

export function removeCookie(name: string) {
    destroyCookie(null, name);
}


