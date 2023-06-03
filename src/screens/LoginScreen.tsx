/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Button, View, Text} from 'react-native';
import {AuthContext} from '../context/authContext';

export const LoginScreen = () => {
  const {
    loggedPlatform,
    // authLoading,
    loginWithFacebook,
    loginWithGoogle,
    logout,
    isLoggedIn,
    user
  } = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <View>
        <Text>
          {JSON.stringify({loggedPlatform, user}, null, 3)}
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#ff0', justifyContent: 'center'}}>
        {
          !isLoggedIn && (
            <>
              <Button title="Facebook login" onPress={loginWithFacebook} />
              <Button title="Google login" onPress={loginWithGoogle} />
            </>
          )
        }
      </View>
      <View style={{flex: 1, backgroundColor: '#00f', justifyContent: 'center'}}>
        {loggedPlatform === 'facebook' && (
          <Button title="Google login" onPress={loginWithGoogle} />
        )}

        {loggedPlatform === 'google' && (
          <Button title="Facebook login" onPress={loginWithFacebook} />
        )}

        {isLoggedIn && <Button title="Logout" onPress={logout} />}
      </View>
    </View>
  );
};
