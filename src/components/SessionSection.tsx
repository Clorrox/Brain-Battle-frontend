import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {CustomButton} from './CustomButton';
import {AuthContext} from '../context/authContext';
import {pallete} from '../theme/pallete';

export const SessionSection = () => {
  const {
    loginWithFacebook,
    loginWithGoogle,
    logout,
    loggedPlatform,
  } = useContext(AuthContext);

  return (
    <View style={styles.buttonsContent}>
      <Text style={styles.title}>Conéctate con:</Text>
      {loggedPlatform === 'google' ? (
        <CustomButton
          label="FACEBOOK"
          iconName="logo-facebook"
          iconColor="white"
          backgroundColor={pallete.blue}
          onClick={loginWithFacebook}
        />
      ) : (
        <CustomButton
          label="GOOGLE"
          iconName="logo-google"
          iconColor="white"
          backgroundColor={pallete.orange}
          onClick={loginWithGoogle}
        />
      )}
      <Text style={styles.title}>o</Text>
      <CustomButton
        label="LOGOUT"
        backgroundColor={pallete.gray}
        onClick={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContent: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
