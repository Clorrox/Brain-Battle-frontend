import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { pallete } from '../../theme/pallete';

export const LocalRakingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LocalRakingScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.primary,
  }
});
