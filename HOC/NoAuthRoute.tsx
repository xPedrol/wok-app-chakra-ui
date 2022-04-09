import {getCookie} from '../services/CookieService';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

// eslint-disable-next-line react/display-name
export const noAuthRoute = (Component) => (props) => {
    const [verified, setVerified] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const authCookie = getCookie(process.env.AUTH_COOKIE_KEY);
        if (authCookie) {
            router.push('/dashboard');
        } else {
            setVerified(true);
        }
    }, []);
    if (verified) {
        return <Component {...props}/>;
    } else {
        return <></>;
    }

};
