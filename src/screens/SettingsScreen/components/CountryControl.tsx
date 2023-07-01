import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {pallete} from '../../../theme/pallete';
import {CountryModal} from './CountryModal';
import {LottieLoading} from '../../../components/LottieLoading';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../context';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

const {width: wWidth, height: wheight} = Dimensions.get('window');


export const CountryControl = () => {
  const {authLoading} = useSelector((state: AppStore) => state.auth);
  const { currentCountry, isModalOpen, toggleModal, loadings } = useContext(SettingsContext);

  console.log({isModalOpen});

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Tu país</Text>
        {!loadings.loadingCurrent && !authLoading ? (
          <View style={styles.countryContainer}>
            <View style={styles.flagContainer}>
              <Image source={{uri: currentCountry.flag}} style={styles.flag} />
              <Text style={styles.countryName}>{currentCountry.name}</Text>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="create" size={35} color={pallete.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <LottieLoading size={60} color={pallete.orange} />
        )}
      </View>
      {isModalOpen && <CountryModal />}
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
