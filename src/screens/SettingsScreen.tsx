import React from 'react';
import {View, StyleSheet} from 'react-native';
import {pallete} from '../theme/pallete';
import { HeaderGoBack, MusicControl, SessionSection } from '../components';

// import {MainNavidationParams} from '../navigation/MainNavidation';
// import {StackScreenProps} from '@react-navigation/stack';

// interface Props extends StackScreenProps<MainNavidationParams> {}

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderGoBack title="Ajustes" />
      <MusicControl/>
      <View style={styles.allSpace} />
      <SessionSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.primary,
  },
  allSpace: {
    flex: 1,
  },
});
