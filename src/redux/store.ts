import { configureStore } from '@reduxjs/toolkit';
import { Auth } from '../interfaces';
import { authReducer } from './slices';

export interface AppStore {
  auth: Auth
}

export const store = configureStore<AppStore>({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch
