import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {CustomButton} from '../../../components/CustomButton';
import {pallete} from '../../../theme/pallete';
import { useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../../redux/store';
import { loginWithFacebookAction, loginWithGoogleAction, logoutAction } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

export const SessionSection = () => {
  const {loggedPlatform} = useSelector((state: AppStore) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.buttonsContent}>
      <Text style={styles.title}>Conéctate con:</Text>
      {loggedPlatform === 'google' ? (
        <CustomButton
          label="FACEBOOK"
          iconName="logo-facebook"
          iconColor="white"
          backgroundColor={pallete.blue}
          onClick={() => dispatch(loginWithFacebookAction({}))}
        />
      ) : (
        <CustomButton
          label="GOOGLE"
          iconName="logo-google"
          iconColor="white"
          backgroundColor={pallete.orange}
          onClick={() => dispatch(loginWithGoogleAction({}))}
        />
      )}
      <Text style={styles.title}>o</Text>
      <CustomButton
        label="LOGOUT"
        backgroundColor={pallete.gray}
        onClick={logoutAction}
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
    color: pallete.white,
    fontWeight: 'bold',
  },
});
