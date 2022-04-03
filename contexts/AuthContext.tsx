import {createContext, useContext, useState} from 'react';
import {Account, AccountType} from '../types/user/Account.type';
import {AuthContextType} from '../types/auth/AuthContext.type';
import {AuthRequestType} from '../types/auth/AuthRequest.type';
import {useBaseToast} from '../hooks/ToastbaseHook';
import {authenticate as authenticateS} from '../services/AuthService';
import {removeCookie, setCookie} from '../services/cookieService';
import {AuthorityEnum} from '../types/user/Authority.type';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<AccountType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useBaseToast();

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

    const getRoutePrefix = (): RoutePrefixEnum => {
        if (user instanceof Account) {
            if (user.getHighestAuthority() === AuthorityEnum.ADMIN) {
                return RoutePrefixEnum.ADMIN;
            }
            if (user.getHighestAuthority() === AuthorityEnum.TEACHER) {
                return RoutePrefixEnum.TEACHER;
            }
            if (user.getHighestAuthority() === AuthorityEnum.USER) {
                return RoutePrefixEnum.ACCOUNT;
            }
        }
        return RoutePrefixEnum.PUBLIC;
    };

    return (
        <AuthContext.Provider value={{user, setUser, isLoading, setIsLoading, authenticate, logout, getRoutePrefix}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
