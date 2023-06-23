import React, {useContext} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {pallete} from '../theme/pallete';
import {CountryControl, HeaderGoBack, MusicControl, SeparatorView, SessionSection} from '../components';
import { AuthContext } from '../context/authContext';

export const SettingsScreen = () => {
  const {user} = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <HeaderGoBack title="Ajustes" />
      <View style={styles.settingsContainer}>
        {/* music controls */}
        <MusicControl />

        {/* country controls */}
        <CountryControl countryCode={user?.country || 'US'} />

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
