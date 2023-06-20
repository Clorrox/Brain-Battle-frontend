import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {AuthContext} from '../context/authContext';
import { Logo } from '../assets';
import { CustomButton } from '../components';
import { pallete } from '../theme/pallete';
import { useAnimationLoop } from '../hooks';

const {height: windowHeight} = Dimensions.get('window');

export const LoginScreen = () => {
  const {
    loginWithFacebook,
    loginWithGoogle,
  } = useContext(AuthContext);

  const logoScale = useAnimationLoop(1, 1.1, 1000);

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
          onClick={loginWithFacebook}
        />
        <CustomButton
          label="GOOGLE"
          iconName="logo-google"
          iconColor="white"
          backgroundColor={pallete.orange}
          onClick={loginWithGoogle}
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
