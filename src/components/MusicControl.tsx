import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {pallete} from '../theme/pallete';
import {CustomSwitch} from './CustomSwitch';
import {UIContext} from '../context/UIContext/UIContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

export const MusicControl = () => {
  const {soundSettings, changeSoundSettings} = useContext(UIContext);

  const handleVolume = (volume: number) => {
    changeSoundSettings({...soundSettings, volume: Number(volume.toFixed(0))});
  };

  const handlePlay = () => {
    changeSoundSettings({
      ...soundSettings,
      play: !soundSettings.play,
    });
  };

  return (
    <>
      <View style={styles.switchContainer}>
        <View style={styles.switchName}>
          <Icon name="musical-notes" color={pallete.white} size={30} />
          <Text style={styles.switchText}>Música</Text>
        </View>
        <CustomSwitch isEnabled={soundSettings.play} onChange={handlePlay} />
      </View>
      <Slider
        value={soundSettings.volume}
        minimumValue={0}
        maximumValue={100}
        thumbTintColor="#fff"
        minimumTrackTintColor="#fff"
        maximumTrackTintColor={pallete.blue}
        onSlidingComplete={handleVolume}
      />
    </>
  );
};

const styles = StyleSheet.create({
  switchText: {
    fontSize: 24,
    color: pallete.white,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
