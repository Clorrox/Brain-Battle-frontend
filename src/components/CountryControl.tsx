import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useRequestData} from '../hooks';
import {Country} from '../interfaces';
import {pallete} from '../theme/pallete';
import {CountryModal} from './CountryModal';
import {LottieLoading} from './LottieLoading';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: wWidth, height: wheight} = Dimensions.get('window');

interface Props {
  countryCode: string;
}

export const CountryControl = ({countryCode}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const {data, isLoading} = useRequestData<Country | undefined>(
    `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,cca2,flags`,
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Tu país</Text>
        {!isLoading && data ? (
          <View style={styles.countryContainer}>
            <View style={styles.flagContainer}>
              <Image source={{uri: data.flags.png}} style={styles.flag} />
              <Text style={styles.countryName}>{data.name.common}</Text>
            </View>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name="create" size={35} color={pallete.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <LottieLoading size={60} color={pallete.orange} />
        )}
      </View>
      {openModal && <CountryModal onCloseModal={handleCloseModal} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallete.blue,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  title: {
    color: pallete.white,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  flag: {
    width: 64,
    height: 37,
  },
  countryName: {
    color: pallete.white,
    fontSize: 20,
  },
  countrysModal: {
    position: 'absolute',
    width: wWidth,
    height: wheight,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryList: {
    backgroundColor: pallete.white,
    width: wWidth * 0.85,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 20,
  },
});
