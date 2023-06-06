import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimationLoop = (initialValue: number, finalValue: number, duration: number) => {
  const animatedValue = useRef(new Animated.Value(initialValue));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue.current, {
          toValue: finalValue,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue.current, {
          toValue: initialValue,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animatedValue.current;
};
