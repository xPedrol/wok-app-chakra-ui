import {createContext, useContext, useState} from 'react';
import {Account, AccountType} from '../types/user/Account.type';
import {AuthContextType} from '../types/auth/AuthContext.type';
import {AuthRequestType} from '../types/auth/AuthRequest.type';
import {useBaseToast} from '../hooks/ToastbaseHook';
import {authenticate as authenticateS} from '../services/AuthService';
import {removeCookie, setCookie} from '../services/CookieService';
import {AuthorityEnum} from '../types/user/Authority.type';
import {RoutePrefixEnum} from '../types/enumerations/RoutePrefix.enum';
import {useQueryClient} from "react-query";

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<AccountType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useBaseToast();
    const queryClient = useQueryClient();
    const authenticate = async (data: AuthRequestType): Promise<boolean> => {
        let success = false;
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
        return success;
    };

    const logout = async () => {
        await queryClient.invalidateQueries();
        removeCookie(process.env.AUTH_COOKIE_KEY);
        setUser(undefined);
    };

    const getRoutePrefix = (noHasAdmin = false): RoutePrefixEnum => {
        if (user instanceof Account) {
            if (user.getHighestAuthority() === AuthorityEnum.ADMIN && !noHasAdmin) {
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
