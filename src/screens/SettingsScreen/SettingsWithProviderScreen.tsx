import React from 'react';
import { SettingsProvider } from './context';
import { SettingsScreen } from './SettingsScreen';

export const SettingsWithProviderScreen = () => {
  return (
    <SettingsProvider>
      <SettingsScreen />
    </SettingsProvider>
  );
};
