import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens';
import {HomeBottonsNavigation} from './HomeBottonsNavigation';
import {pallete} from '../theme/pallete';
import {useSelector} from 'react-redux';
import {AppStore} from '../redux/store';
import { SettingsWithProviderScreen } from '../screens/SettingsScreen';

export type MainNavidationParams = {
  HomeNavigator: undefined;
  SettingsScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<MainNavidationParams>();

export const MainNavidation = () => {
  const {isLoggedIn} = useSelector((state: AppStore) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="HomeNavigator"
            component={HomeBottonsNavigation}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsWithProviderScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            cardStyle: {
              backgroundColor: pallete.primary,
            },
          }}
        />
      )}
    </Stack.Navigator>
  );
};
