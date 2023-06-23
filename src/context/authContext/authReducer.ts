import {User} from '../../interfaces';
import { LoginPlatforms } from './AuthContext';
import {AuthState} from './AuthProvider';

type actionType =
  | {type: 'login-to-facebook'; payload: User}
  | {type: 'login-to-google'; payload: User}
  | {type: 'update-state'; payload: {user: User, platform: LoginPlatforms}}
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: actionType,
): AuthState => {
  switch (action.type) {
    case 'login-to-facebook':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loggedPlatform: 'facebook',
      };

    case 'login-to-google':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loggedPlatform: 'google',
      };

    case 'update-state':
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        loggedPlatform: action.payload.platform,
      };

    case 'logout':
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
        loggedPlatform: undefined,
      };

    default:
      return state;
  }
};
