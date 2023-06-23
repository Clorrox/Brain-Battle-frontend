import React from 'react';
import { Switch } from 'react-native';
import { pallete } from '../theme/pallete';

interface Props {
    isEnabled: boolean;
    onChange: () => void;
}

export const CustomSwitch = ({ isEnabled, onChange }: Props) => {

  return (
    <Switch
      trackColor={{false: pallete.gray, true: pallete.blue}}
      thumbColor={pallete.white}
      onValueChange={onChange}
      value={isEnabled}
    />
  );
};
