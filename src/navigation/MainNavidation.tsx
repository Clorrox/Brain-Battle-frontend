import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SettingsScreen } from '../screens';
import { HomeBottonsNavigation } from './HomeBottonsNavigation';
import { pallete } from '../theme/pallete';
import { AuthContext } from '../context/authContext';

export type MainNavidationParams = {
  HomeNavigator: undefined,
  SettingsScreen: undefined,
  LoginScreen: undefined,
}

const Stack = createStackNavigator<MainNavidationParams>();

export const MainNavidation = () => {

  const {isLoggedIn} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        isLoggedIn ? (
          <>
            <Stack.Screen name="HomeNavigator" component={HomeBottonsNavigation} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
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
        )
      }
    </Stack.Navigator>
  );
};
