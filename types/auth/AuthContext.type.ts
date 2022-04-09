import {AccountType} from '../user/Account.type';
import {AuthRequestType} from './AuthRequest.type';
import {RoutePrefixEnum} from '../enumerations/RoutePrefix.enum';

export type AuthContextType = {
    user: AccountType | null;
    setUser: (user: AccountType | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoggedIn: boolean) => void;

    authenticate: (data: AuthRequestType) => Promise<boolean>;
    logout: () => void;
    getRoutePrefix: (noHasAdmin?:boolean) => RoutePrefixEnum;
}
