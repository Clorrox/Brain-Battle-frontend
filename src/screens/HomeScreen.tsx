import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/authContext';

export const HomeScreen = () => {
  const { logout, ...rest } = useContext(AuthContext);
  return (
    <View>
      <Text>{JSON.stringify(rest, null, 5)}</Text>
      <Button
        title="logout"
        onPress={logout}
      />
    </View>
  );
};
