
import {useAuthContext} from '../contexts/AuthContext';
import {getAccount as getAccountS} from '../services/AccountService';
import {getCookie} from '../services/cookieService';
import {Account} from '../types/user/Account.type';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

function protectedRoute (WrappedComponent){
    // eslint-disable-next-line react/display-name
    return (props) => {
        const router = useRouter();
        const auth = useAuthContext();
        useEffect(() => {
            const redirect = () => {
                router.push('/');
            };
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
            return <WrappedComponent {...props} />;
        } else {
            return <></>;
        }
    }
}
export default protectedRoute;
