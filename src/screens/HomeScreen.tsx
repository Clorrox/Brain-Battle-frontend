import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { pallete } from '../theme/pallete';
import { HomeHeader } from '../components';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.dark,
    paddingTop: 10,
  },
});
