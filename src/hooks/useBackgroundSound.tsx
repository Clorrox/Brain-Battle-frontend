/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import Sound from 'react-native-sound';
import {SoundSettings} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBackgroundSound = () => {
  const [music, setMusic] = useState<Sound>();
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    play: true,
    volume: 100,
  });

  const playSong = (bundle: Sound) => {
    bundle.play(success => {
      if (success) {
        playSong(bundle);
      } else {
        console.log('error al hacer play');
      }
    });
  };

  const pauseSong = (bundle: Sound) => {
    bundle.pause();
  };

  const changeSoundSettings = (newSettings: SoundSettings) => {
    setSoundSettings(newSettings);
    AsyncStorage.setItem('sound-settings', JSON.stringify(newSettings));
  };

  const playWithSettings = (settings: SoundSettings, bundle: Sound) => {
    if (settings.play) {
      playSong(bundle);
    } else {
      pauseSong(bundle);
    }
    bundle.setVolume(settings.volume * 0.01);
  };

  useEffect(() => {
    if (!music) return;
    playWithSettings(soundSettings, music);
  }, [soundSettings, music]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('sound-settings');
      if (data) {
        const settings = JSON.parse(data) as SoundSettings;
        setSoundSettings(settings);
      }
    })();
  }, []);

  useEffect(() => {
    if (!music) return;
    AppState.addEventListener('change', state => {
      if (state === 'active') {
        playWithSettings(soundSettings, music);
      } else {
        pauseSong(music);
      }
    });
  }, [music]);

  useEffect(() => {
    if (music) return;
    const song = new Sound('music.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
        return;
      }
      setMusic(song);
    });
  }, []);

  return {
    soundSettings,
    changeSoundSettings,
  };
};
