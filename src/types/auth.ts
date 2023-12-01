// project imports
import { UserProfile } from 'types/user-profile';

export type AuthContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    permissions?: any;
    logout: () => void;
    login: () => void;
    setPermissions: (permissions: any) => void;
    checkPermission: (permission: string) => boolean;
    jwtEmailPasswordSignIn: (email: string, password: string) => Promise<void>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    permissions?: any;
}
