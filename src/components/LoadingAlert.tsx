import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { pallete } from '../theme/pallete';
import { LottieLoading } from './LottieLoading';

const {width: wWidth, height: wHeight} = Dimensions.get('window');

export const LoadingAlert = () => {

  const boxOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(boxOpacity.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.main}>
      <Animated.View
        style={{...styles.box, opacity: boxOpacity.current}}
      >
        <View style={styles.box2}>
          <LottieLoading size={100} color={pallete.orange} />
          <Text style={styles.textBox}>Procesando</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    height: wHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: wWidth * 0.6,
    backgroundColor: pallete.gray,
    height: wWidth * 0.4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: wWidth * 0.6,
    backgroundColor: 'white',
    height: wWidth * 0.4 - 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  textBox: {
    fontSize: 20,
    color: pallete.gray,
    fontWeight: '600',
  },
});
