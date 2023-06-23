import React from 'react';
import Lottie from 'lottie-react-native';
import {StyleSheet} from 'react-native';

interface Props {
  color: string;
  size: number;
}

export const LottieLoading = ({color, size}: Props) => {
  return (
    <Lottie
      source={require('../assets/lottie-animations/lottie-loading.json')}
      autoPlay
      colorFilters={[
        {
          keypath: 'ball',
          color: color,
        },
      ]}
      style={{...styles.loading, width: size}}
    />
  );
};
const styles = StyleSheet.create({
  loading: {
    width: 60,
    alignSelf: 'center',
  },
});
