import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens';
import { HomeBottonsNavigation } from './HomeBottonsNavigation';
import { RankingTopTapsNavigation } from './RankingTopTapsNavigation';

const Stack = createStackNavigator();

export const MainNavidation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeNavigator" component={HomeBottonsNavigation} />
      <Stack.Screen name="RankingNavigator" component={RankingTopTapsNavigation} />
    </Stack.Navigator>
  );
};
