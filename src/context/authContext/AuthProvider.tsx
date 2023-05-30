import React, {useEffect, useReducer, useRef} from 'react';
import {AuthContext, authReducer} from './';
import {LoginPlatforms} from './AuthContext';
import {User} from '../../interfaces';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export interface AuthState {
  isLoggedIn: boolean;
  loggedPlatform?: LoginPlatforms;
  authLoading: boolean;
  user?: User;
}

const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  authLoading: true,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const isMounted = useRef(true);

  useEffect(() => {
    (async () => {
      const isLoggedInGoogle = await GoogleSignin.isSignedIn();
      const facebookToken = await AccessToken.getCurrentAccessToken();

      if (isLoggedInGoogle) {
        const user = await GoogleSignin.getCurrentUser();
        if (isMounted.current) {
          console.log(user);
          dispatch({type: 'login-to-google', payload: {name: 'miguel'}});
        }
      } else if (facebookToken) {
        if (isMounted.current) {
          console.log(facebookToken);
          dispatch({type: 'login-to-facebook', payload: {name: 'oscar'}});
        }
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loginWithFacebook = async () => {
    const response = await LoginManager.logInWithPermissions([
      'gaming_profile',
    ]);
    if (response.isCancelled) return;

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) return;

    console.log({facebook_token: data.accessToken});
    dispatch({type: 'login-to-facebook', payload: {name: 'oscar'}});
    GoogleSignin.signOut();
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      console.log({google_token: tokens.accessToken});
      dispatch({type: 'login-to-google', payload: {name: 'miguel'}});
      LoginManager.logOut();
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('en progreso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('no habilitado');
      } else {
        // some other error happened
        console.log('otra cosa salió mal');
        console.log(error);
      }
    }
  };

  const logout = () => {
    if (state.loggedPlatform === 'facebook') {
      LoginManager.logOut();
    } else {
      GoogleSignin.signOut();
    }
    dispatch({type: 'logout'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithFacebook,
        loginWithGoogle,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
