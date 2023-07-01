/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Country} from '../../../interfaces';
import { SettingsContext } from '../context';
import { updateCountryAction } from '../../../redux/actions';
import { useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useFilterData } from '../hooks';

const {height: wheight} = Dimensions.get('window');

interface Props {
  inputField: string;
}

export const CountryList = ({inputField}: Props) => {
  const {user} = useSelector((state: AppStore) => state.auth);
  const {toggleModal, allCountries} = useContext(SettingsContext);
  const {filterData, newData} = useFilterData<Country>(allCountries);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectCountry = (code: string) => {
    dispatch(updateCountryAction({userId: user.id, countryCode: code}))
    .finally(() => {
      toggleModal();
    });
  };

  useEffect(() => {
    filterData('name', inputField);
  }, [inputField]);

  return (
    <ScrollView style={styles.countryList}>
      {newData.slice(0, 20).map(country => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={country.name}
          style={styles.country}
          onPress={() => handleSelectCountry(country.code)}>
          <Image
            source={{uri: country.flag}}
            style={styles.countryImage}
          />
          <Text>{country.name.split(' ').slice(0, 2).join(' ')}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  countryList: {
    maxHeight: wheight * 0.6,
    marginTop: 10,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  countryImage: {
    width: 64,
    height: 37,
  },
});
