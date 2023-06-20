/* eslint-disable react-native/no-inline-styles */
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { pallete } from '../theme/pallete';

const { height: wHeight } = Dimensions.get('window');

export const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{...styles.tab, ...(label === 'Batalla' ? { ...styles.separator } : {})}}>
                { options.tabBarIcon !== undefined && options.tabBarIcon({focused: isFocused, color: '#673ab7', size: 50}) }
                { isFocused && <Text style={styles.tabText}>{label}</Text> }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: pallete.blue,
    height: wHeight * 0.07,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: pallete.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    zIndex: 100,
  },
  separator: {
    borderColor: pallete.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginVertical: 7,
  },
});
