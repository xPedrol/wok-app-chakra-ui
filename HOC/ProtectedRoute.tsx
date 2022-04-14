import {useAuthContext} from '../contexts/AuthContext';
import {getAccount as getAccountS} from '../services/AccountService';
import {getCookie} from '../services/CookieService';
import {Account} from '../types/user/Account.type';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {AuthorityEnum} from "../types/user/Authority.type";
import {redirect} from "next/dist/server/api-utils";

// eslint-disable-next-line react/display-name
export const protectedRoute = (Component: any, authorities: AuthorityEnum[] = []) => (props) => {
    const router = useRouter();
    const auth = useAuthContext();
    const redirect = (url = '/') => {
        router.push(url);
    };
    useEffect(() => {

        const getAccount = async () => {
            return await getAccountS();
        };
        const authCookie = getCookie(process.env.AUTH_COOKIE_KEY);
        if (authCookie) {
            getAccount().then(res => {
                let account = res.data;
                if (account) {
                    account = new Account(account);
                    auth.setUser(account);
                } else {
                    auth.setUser(undefined);
                }
            });
        } else {
            redirect();
        }
    }, []);

    if (auth.user instanceof Account) {
        if (auth.user.hasAnyAuthority(authorities)) {
            return <Component {...props}/>;
        } else {
            redirect('/404');
        }
    } else {
        return <></>;

    }

};
