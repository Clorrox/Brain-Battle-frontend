import React from 'react';
import {UIContext} from './UIContext';
import { useBackgroundSound } from '../../hooks';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { LoadingAlert } from '../../components';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UIProvider = ({children}: Props) => {
  const {authLoading} = useSelector((state: AppStore) => state.auth);
  const { soundSettings, changeSoundSettings } = useBackgroundSound();

  return (
    <UIContext.Provider
      value={{
        soundSettings,
        changeSoundSettings,
      }}>
      {children}
      {authLoading && <LoadingAlert/>}
    </UIContext.Provider>
  );
};
