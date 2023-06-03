import { createContext } from 'react';
import { User } from '../../interfaces';

export type LoginPlatforms = 'google' | 'facebook';

interface ContextProps {
    isLoggedIn: boolean;
    authLoading: boolean;
    loggedPlatform?: LoginPlatforms;
    user?: User;
    loginWithFacebook: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
