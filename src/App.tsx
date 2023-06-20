import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavidation} from './navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { AuthProvider } from './context/authContext';
import { UIProvider } from './context/UIContext/UIProvider';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '706161254514-f3u6jii57kuhs53r0kl8cl48dkdtebgn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: 'oscar', // [Android] specifies an account name on the device that should be used
    });
  }, []);

  return (
    <NavigationContainer>
      <UIProvider>
        <AuthProvider>
          <MainNavidation />
        </AuthProvider>
      </UIProvider>
    </NavigationContainer>
  );
};

export default App;
