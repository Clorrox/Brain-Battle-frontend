import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {pallete} from '../theme/pallete';
import {AuthContext} from '../context/authContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavidationParams} from '../navigation/MainNavidation';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: wWidth} = Dimensions.get('window');

export const HomeHeader = () => {
  const {user} = useContext(AuthContext);
  const {navigate} =
    useNavigation<NavigationProp<MainNavidationParams, 'HomeNavigator'>>();

  return (
    <View style={styles.headerContent}>
      <View>
        <View style={styles.levelHeader}>
          <Icon name="star" color={pallete.blue} size={55} />
          <Text style={styles.levelText}>{user?.level}</Text>
        </View>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {user?.exp}/{user?.expToNextLevel}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('SettingsScreen')}>
        <Icon name="settings" color={pallete.white} size={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  levelHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 150,
    left: -10,
    top: -18,
    shadowColor: '#000',
    elevation: 3,
  },
  starImage: {
    width: 55,
    height: 55,
  },
  settingsImage: {
    width: 35,
    height: 35,
  },
  progressHeader: {
    width: wWidth * 0.45,
    backgroundColor: pallete.primary,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  levelText: {
    color: pallete.white,
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressText: {
    color: pallete.white,
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
  },
});
