import React from 'react';
import {UIContext} from './UIContext';
import { useBackgroundSound } from '../../hooks';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UIProvider = ({children}: Props) => {
  const { soundSettings, changeSoundSettings } = useBackgroundSound();

  return (
    <UIContext.Provider
      value={{
        soundSettings,
        changeSoundSettings,
      }}>
      {children}
    </UIContext.Provider>
  );
};
