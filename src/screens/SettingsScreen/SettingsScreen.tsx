import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {pallete} from '../../theme/pallete';
import { HeaderGoBack, SeparatorView } from '../../components';
import { MusicControl, CountryControl, SessionSection } from './components';

export const SettingsScreen = () => {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <HeaderGoBack title="Ajustes" />
      <View style={styles.settingsContainer}>
        {/* music controls */}
        <MusicControl />

        {/* country controls */}
        <CountryControl />

        {/* separator */}
        <SeparatorView />

        {/* change session */}
        <SessionSection />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.dark,
  },
  settingsContainer: {
    flex: 1,
    padding: 15,
  },
});
