import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {pallete} from '../theme/pallete';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  backgroundColor?: string;
  color?: string;
}

export const HeaderGoBack = ({
  title,
  backgroundColor = pallete.blue,
  color = pallete.white,
}: Props) => {
  const {goBack} = useNavigation();

  return (
    <View style={{...styles.header, backgroundColor}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconContainer}
        onPress={goBack}
      >
        <Icon name="chevron-back-outline" color={color} size={35} />
      </TouchableOpacity>
      <Text style={{...styles.headerText, color}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
});
