import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuthContext} from '../contexts/AuthContext';
import {getAccount as getAccountS} from '../services/AccountService'
import {getCookie} from '../services/cookieService';
export function ProtectedRoute({children}: any) {
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
                const account = res.data;
                auth.setUser(account);
            });
        } else {
            redirect();
        }
    }, []);

    if (auth.user) {
        return (
            <>{children}</>
        );
    } else {
        return <></>;
    }
}
