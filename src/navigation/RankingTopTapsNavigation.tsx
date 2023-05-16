import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalRankingScreen, LocalRakingScreen } from '../screens';

const Tab = createMaterialTopTabNavigator();

export const RankingTopTapsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="GlobalRankingScreen" component={GlobalRankingScreen} />
      <Tab.Screen name="LocalRakingScreen" component={LocalRakingScreen} />
    </Tab.Navigator>
  );
};
