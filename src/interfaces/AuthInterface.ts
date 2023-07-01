import { User, UserEmptyState } from './UserInterfaces';

export interface Auth {
    user: User,
    isLoggedIn: boolean,
    loggedPlatform: string,
    authLoading: boolean,
    message: string,
}

export const AuthEmptyState: Auth = {
    user: UserEmptyState,
    isLoggedIn: false,
    loggedPlatform: '',
    authLoading: false,
    message: '',
};
