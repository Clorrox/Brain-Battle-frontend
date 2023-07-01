import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavidation} from './navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { UIProvider } from './context/UIContext/UIProvider';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '706161254514-f3u6jii57kuhs53r0kl8cl48dkdtebgn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <UIProvider>
          <MainNavidation />
        </UIProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
