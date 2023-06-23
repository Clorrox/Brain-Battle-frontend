import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {pallete} from '../theme/pallete';
import {HomeHeader} from '../components';
import {AuthContext} from '../context/authContext';

export const HomeScreen = () => {
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View
        style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{gap: 10}}>
          <Image
            source={{uri: user?.imgUrl}}
            style={{width: 200, height: 200, borderRadius: 100}}
          />
          <Text
            style={{
              textAlign: 'center',
              color: pallete.white,
              fontSize: 25,
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 1,
              textTransform: 'uppercase'
            }}>
            {user?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.dark,
    paddingTop: 10,
  },
});
