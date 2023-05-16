import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavidation} from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavidation />
    </NavigationContainer>
  );
};

export default App;
