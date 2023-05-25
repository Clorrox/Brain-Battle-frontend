import React, { useEffect, useRef, useState } from 'react';
import {Button, View} from 'react-native';
import {AccessToken, Profile, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const LoginScreen = () => {
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isloggedInFacebook, setIsloggedInFacebook] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    (async() => {
      const result = await GoogleSignin.isSignedIn();
      if (isMounted.current) {
        setIsloggedIn(result);
      }
    })();
    AccessToken.getCurrentAccessToken()
    .then(token => {
      if (!isMounted.current) return;
      if (token) {
        setIsloggedInFacebook(true);
      } else {
        setIsloggedInFacebook(false);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  const logoutToFacebook = () => {
    LoginManager.logOut();
    setIsloggedInFacebook(false);
  };

  const loginToFacebook = () => {
    LoginManager.logInWithPermissions(['gaming_profile'])
    .then((res) => {
      if (!res.isCancelled) {
        setIsloggedInFacebook(true);
      }
    });
    Profile.getCurrentProfile().then(current => {
      if (current) {
        console.log(current);
      }
    });
  };

  const loginGoogle = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setIsloggedIn(true);
      console.log({userInfo});
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

  const logoutGoogle = async() => {
    await GoogleSignin.signOut();
    setIsloggedIn(false);
  };

  return (
    <View>
      {
        isloggedInFacebook ? (
          <Button
            title="Facebook logout"
            onPress={logoutToFacebook}
          />
        ) : (
          <Button
            title="Facebook login"
            onPress={loginToFacebook}
          />
        )
      }

      {
        isloggedIn ? (
          <Button
            title="Google Logout"
            onPress={logoutGoogle}
          />
        ) : (
          <Button
            title="Google Login"
            onPress={loginGoogle}
          />
        )
      }
    </View>
  );
};
