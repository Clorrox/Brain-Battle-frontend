/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen } from '../screens';
import { CustomTabBar } from '../components';
import { RankingTopTapsNavigation } from './RankingTopTapsNavigation';
import { Image, StyleSheet } from 'react-native';
import { BattleIcon } from '../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import { pallete } from '../theme/pallete';

const Tab = createBottomTabNavigator();

export const HomeBottonsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="RankingNavigator"
        component={RankingTopTapsNavigation}
        options={{
          title: 'Ranking',
          tabBarIcon: () => (
            <Icon
              name="trophy-sharp"
              color={pallete.white}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Batalla',
          tabBarIcon: () => (
            <Image
              source={BattleIcon}
              style={{...styles.tabIcon, width: 55}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: () => (
            <Icon
              name="person"
              color={pallete.white}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
    zIndex: 100,
  },
});
