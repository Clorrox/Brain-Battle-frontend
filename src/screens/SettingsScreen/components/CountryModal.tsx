import React, {useRef, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {pallete} from '../../../theme/pallete';
import { CountryList } from './CountryList';
import { SettingsContext } from '../context';
import { LottieLoading } from '../../../components';

const {width: wWidth, height: wheight} = Dimensions.get('window');

export const CountryModal = () => {
  const { toggleModal, loadings } = useContext(SettingsContext);
  const [inputField, setInputField] = useState('');
  const containerRef = useRef(null);

  const handlePressOut = (event: GestureResponderEvent) => {
    if (event.target === containerRef.current) {
      toggleModal();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.countrysModal}
      onPress={handlePressOut}
      ref={containerRef}>
      <View style={styles.countryContainer}>
        <TextInput
          placeholder="Buscar"
          style={styles.input}
          value={inputField}
          onChangeText={e => setInputField(e)}
        />
        {!loadings.loadingAll ? (
          <CountryList inputField={inputField} />
        ) : (
          <LottieLoading size={70} color={pallete.orange} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countrysModal: {
    position: 'absolute',
    width: wWidth,
    height: wheight,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  countryContainer: {
    backgroundColor: pallete.white,
    width: wWidth * 0.85,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 20,
    marginTop: -200,
  },
  input: {
    borderColor: pallete.dark,
    borderBottomWidth: 1,
    paddingVertical: 0,
  },
});
