import React, {useContext} from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Country} from '../interfaces';
import {AuthContext} from '../context/authContext';

const {height: wheight} = Dimensions.get('window');

interface Props {
  data: Country[];
  onCloseModal: () => void;
}

export const CountryList = ({data, onCloseModal}: Props) => {
  const {updateCountry, loggedPlatform, user} = useContext(AuthContext);

  const handleSelectCountry = (code: string) => {
    updateCountry(user?.id!, code, loggedPlatform!).finally(() =>
      onCloseModal(),
    );
  };

  return (
    <ScrollView style={styles.countryList}>
      {data?.map(country => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={country.cca2}
          style={styles.country}
          onPress={() => handleSelectCountry(country.cca2)}>
          <Image
            source={{uri: country.flags.png}}
            style={styles.countryImage}
          />
          <Text>{country.name.common.split(' ').slice(0, 2).join(' ')}</Text>
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
