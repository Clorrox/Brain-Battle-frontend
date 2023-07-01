import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthEmptyState, User, UserEmptyState} from '../../interfaces';
import { LoginAction, loginWithFacebookAction, loginWithGoogleAction, logoutAction, updateCountryAction } from '../actions';

interface LoginFulfilledAction extends PayloadAction<LoginAction> {}
interface UpdateFulfilledAction extends PayloadAction<User> {}

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthEmptyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // facebook login
    .addCase(loginWithFacebookAction.pending, (state) => {
      state.authLoading = true;
    })
    .addCase(loginWithFacebookAction.rejected, (state, action) => {
      state.message = action.error.message || '';
      state.authLoading = false;
      console.log(state);
    })
    .addCase(loginWithFacebookAction.fulfilled, (state, action: LoginFulfilledAction) => {
      const { user, platform } = action.payload;
      state.user = user;
      state.loggedPlatform = platform;
      state.isLoggedIn = true;
      state.authLoading = false;
    })
    // google login
    .addCase(loginWithGoogleAction.pending, (state) => {
      state.authLoading = true;
    })
    .addCase(loginWithGoogleAction.rejected, (state, action) => {
      state.message = action.error.message || '';
      state.authLoading = false;
    })
    .addCase(loginWithGoogleAction.fulfilled, (state, action: LoginFulfilledAction) => {
      const { user, platform } = action.payload;
      state.user = user;
      state.loggedPlatform = platform;
      state.isLoggedIn = true;
      state.authLoading = false;
      state.message = '';
    })
    // logout
    .addCase(logoutAction.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.loggedPlatform = '';
      state.user = UserEmptyState;
    })
    // update country
    .addCase(updateCountryAction.pending, (state) => {
      state.authLoading = true;
    })
    .addCase(updateCountryAction.rejected, (state) => {
      state.authLoading = false;
      state.message = 'Error al actualizar';
    })
    .addCase(updateCountryAction.fulfilled, (state, action: UpdateFulfilledAction) => {
      state.authLoading = false;
      state.user = action.payload;
      state.message = '';
    });
  },
});

export default authSlice.reducer;
