/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import { Logo } from '../../assets';
import { CustomButton } from '../../components';
import { pallete } from '../../theme/pallete';
import { useAnimationLoop } from '../../hooks';
import { loginWithFacebookAction, loginWithGoogleAction } from '../../redux/actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const {height: windowHeight} = Dimensions.get('window');

export const LoginScreen = () => {
  const logoScale = useAnimationLoop(1, 1.1, 1000);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async() => {
      const isLoggedInGoogle = await GoogleSignin.isSignedIn();
      const facebookToken = await AccessToken.getCurrentAccessToken();

      if (isLoggedInGoogle) {
        dispatch(loginWithGoogleAction({revalidate: true}));
      } else if (facebookToken) {
        dispatch(loginWithFacebookAction({revalidate: true}));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={Logo}
          style={{...styles.image, transform: [{scale: logoScale}]}}
        />
      </View>
      <View style={styles.buttonsContent}>
        <Text style={styles.title}>Conéctate con:</Text>
        <CustomButton
          label="FACEBOOK"
          iconName="logo-facebook"
          iconColor="white"
          backgroundColor={pallete.blue}
          onClick={() => dispatch(loginWithFacebookAction({}))}
        />
        <CustomButton
          label="GOOGLE"
          iconName="logo-google"
          iconColor="white"
          backgroundColor={pallete.orange}
          onClick={() => dispatch(loginWithGoogleAction({}))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    height: windowHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 208,
    height: 148,
  },
  buttonsContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
