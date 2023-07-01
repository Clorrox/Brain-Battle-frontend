import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {getCountry} from 'react-native-localize';
import {login, updateUser} from '../../api/brainBattleApi';
import {Auth, User} from '../../interfaces';

export type LoginAction = {user: User; platform: string};

interface LoginArg {
  revalidate?: boolean;
}

export const loginWithFacebookAction = createAsyncThunk<LoginAction, LoginArg>(
  'auth/facebook',
  async ({revalidate}, {fulfillWithValue, rejectWithValue}) => {
    // Get facebook access
    if (!revalidate) {
      const response = await LoginManager.logInWithPermissions([
        'gaming_profile',
      ]);
      if (response.isCancelled) return rejectWithValue('Cancelado');
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) return rejectWithValue('autenticacion fallida');

    // Login to our backend
    try {
      const userGameData = await login(data.accessToken, 'facebook');
      if (userGameData.country) {
        GoogleSignin.signOut();
        return fulfillWithValue({user: userGameData, platform: 'facebook'});
      } else {
        const countryCode = getCountry();
        const userUpdated = await updateUser(userGameData.id, {
          country: countryCode,
        });
        GoogleSignin.signOut();
        return fulfillWithValue({user: userUpdated, platform: 'facebook'});
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('autenticacion fallida');
    }
  },
);

export const loginWithGoogleAction = createAsyncThunk<LoginAction, LoginArg>(
  'auth/google',
  async ({revalidate}) => {
    try {
      // Get google access
      if (!revalidate) {
        await GoogleSignin.signIn();
      }
      const tokens = await GoogleSignin.getTokens();

      // Login to our backend
      try {
        const userGameData = await login(tokens.accessToken, 'google');
        if (userGameData.country) {
          LoginManager.logOut();
          return {user: userGameData, platform: 'google'};
        } else {
          const countryCode = getCountry();
          const userUpdated = await updateUser(userGameData.id, {
            country: countryCode,
          });
          LoginManager.logOut();
          return {user: userUpdated, platform: 'google'};
        }
      } catch (error) {
        console.log(error);
        throw new Error('autenticacion fallida');
      }
    } catch (error) {
      console.log(error);
      throw new Error('autenticacion fallida');
    }
  },
);

export const logoutAction = createAsyncThunk('logout', (_, {getState}) => {
  const {loggedPlatform} = getState() as Auth;
  if (loggedPlatform === 'facebook') {
    LoginManager.logOut();
  } else {
    GoogleSignin.signOut();
  }
  return;
});

interface UpdateCountryParams {
  userId: string;
  countryCode: string;
}
export const updateCountryAction = createAsyncThunk(
  'update/country',
  async ({userId, countryCode}: UpdateCountryParams) => {
    try {
      const userUpdated = await updateUser(userId, {
        country: countryCode,
      });
      return userUpdated;
    } catch (error) {
      throw new Error('Error al actualizar');
    }
  },
);
