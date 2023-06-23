import React, {useEffect, useReducer, useRef, useState} from 'react';
import {AuthContext, authReducer} from './';
import {LoginPlatforms} from './AuthContext';
import {User} from '../../interfaces';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { login, updateUser } from '../../api/brainBattleApi';
import { LoadingAlert } from '../../components';
import {getCountry} from 'react-native-localize';

export interface AuthState {
  isLoggedIn: boolean;
  loggedPlatform?: LoginPlatforms;
  user?: User;
}

const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const [authLoading, setAuthLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    (async () => {
      const isLoggedInGoogle = await GoogleSignin.isSignedIn();
      const facebookToken = await AccessToken.getCurrentAccessToken();

      if (isLoggedInGoogle) {
        const tokens = await GoogleSignin.getTokens();
        if (isMounted.current) {
          // Login to our backend
          setAuthLoading(true);
          try {
            const userGameData = await login(tokens.accessToken, 'google');
            dispatch({type: 'login-to-google', payload: userGameData});
          } catch (error) {
            console.log(error);
          }
          setAuthLoading(false);
        }
      } else if (facebookToken) {
        if (isMounted.current) {
          // Login to our backend
          setAuthLoading(true);
          try {
            console.log('aquiiiii');
            const userGameData = await login(facebookToken.accessToken, 'facebook');
            console.log({userGameData});
            dispatch({type: 'login-to-facebook', payload: userGameData});
          } catch (error) {
            console.log(error);
          }
          setAuthLoading(false);
        }
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loginWithFacebook = async () => {
    // Get facebook access
    const response = await LoginManager.logInWithPermissions([
      'gaming_profile',
    ]);
    if (response.isCancelled) return;

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) return;

    // Login to our backend
    setAuthLoading(true);
    try {
      const userGameData = await login(data.accessToken, 'facebook');
      if (userGameData.country) {
        dispatch({type: 'login-to-facebook', payload: userGameData});
      } else {
        const countryCode = getCountry();
        await updateCountry(userGameData.id, countryCode, 'facebook');
      }
    } catch (error) {
      console.log(error);
    }
    setAuthLoading(false);

    GoogleSignin.signOut();
  };

  const loginWithGoogle = async () => {
    try {
      // Get google access
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      // Login to our backend
      setAuthLoading(true);
      try {
        const userGameData = await login(tokens.accessToken, 'google');
        if (userGameData.country) {
          dispatch({type: 'login-to-google', payload: userGameData});
        } else {
          const countryCode = getCountry();
          await updateCountry(userGameData.id, countryCode, 'google');
        }
      } catch (error) {
        console.log(error);
      }
      setAuthLoading(false);

      LoginManager.logOut();
    } catch (error: any) {
      console.log(error);
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

  const updateCountry = async(userId: string, value: string, platform: LoginPlatforms) => {
    const userUpdated = await updateUser(userId, {country: value});
    dispatch({type: 'update-state', payload: {user: userUpdated, platform}});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authLoading,
        loginWithFacebook,
        loginWithGoogle,
        logout,
        updateCountry,
      }}>
      {children}
      {authLoading && <LoadingAlert />}
    </AuthContext.Provider>
  );
};
