import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {pallete} from '../theme/pallete';

const {width: windowWidth} = Dimensions.get('window');

interface Props {
  iconName?: string;
  iconColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
  label: string;
}

export const CustomButton = ({
  iconName,
  iconColor,
  label,
  backgroundColor,
  onClick,
}: Props) => {
  return (
    <TouchableOpacity
    activeOpacity={0.85}
      style={{
        ...styles.button,
        ...(backgroundColor ? {backgroundColor} : {}),
      }}
      onPress={onClick}
    >
      {iconName && iconColor && (
        <Icon name={iconName} size={40} color={iconColor} />
      )}
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: pallete.gray,
    flexDirection: 'row',
    width: windowWidth * 0.7,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    elevation: 3,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
