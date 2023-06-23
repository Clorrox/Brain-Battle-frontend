/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {pallete} from '../theme/pallete';
import {useFilterData, useRequestData} from '../hooks';
import {Country} from '../interfaces';
import { LottieLoading } from './LottieLoading';
import { CountryList } from './CountryList';

const {width: wWidth, height: wheight} = Dimensions.get('window');

interface Props {
  onCloseModal: () => void;
}

export const CountryModal = ({onCloseModal}: Props) => {
  const [inputField, setInputField] = useState('');
  const containerRef = useRef(null);

  const {data, isLoading} = useRequestData<Country[]>(
    'https://restcountries.com/v3.1/all?fields=name,cca2,flags',
    [],
  );
  const {filterData, newData} = useFilterData<Country[]>(data);

  const handlePressOut = (event: GestureResponderEvent) => {
    if (event.target === containerRef.current) {
      onCloseModal();
    }
  };

  useEffect(() => {
    filterData('name', inputField);
  }, [inputField]);

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
        {!isLoading && newData ? (
          <CountryList data={newData} onCloseModal={onCloseModal} />
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
