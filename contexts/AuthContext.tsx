import {createContext, useContext, useState} from 'react';
import {AccountType} from '../types/user/Account.type';
import {AuthContextType} from '../types/auth/AuthContext.type';
import {AuthRequestType} from '../types/auth/AuthRequest.type';
import {useBaseToast} from '../hooks/ToastbaseHook';
import {authenticate as authenticateS} from '../services/AuthService';
import {removeCookie, setCookie} from '../services/cookieService';

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<AccountType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useBaseToast();
    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //         setUser(JSON.parse(user));
    //     }
    // }, []);
    const authenticate = async (data: AuthRequestType): Promise<boolean> => {
        let success = false;
        setIsLoading(true);
        try {
            const res = await authenticateS(data);
            const token = res.data?.id_token;
            if (token) {
                setCookie(process.env.AUTH_COOKIE_KEY, token);
                success = true;
            }
        } catch (err) {
            if (!toast.isActive(err.message)) {
                toast({
                    id: err.message,
                    title: err.message,
                    status: 'error',
                });
            }
        }
        setIsLoading(false);
        return success;
    };

    const logout = () => {
        setUser(null);
        removeCookie(process.env.AUTH_COOKIE_KEY);
    };
    return (
        <AuthContext.Provider value={{user, setUser, isLoading, setIsLoading, authenticate,logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
