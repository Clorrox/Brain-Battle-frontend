import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens';
import { HomeBottonsNavigation } from './HomeBottonsNavigation';
import { RankingTopTapsNavigation } from './RankingTopTapsNavigation';
import { pallete } from '../theme/pallete';
import { AuthContext } from '../context/authContext';

const Stack = createStackNavigator();

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
            <Stack.Screen name="RankingNavigator" component={RankingTopTapsNavigation} />
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
