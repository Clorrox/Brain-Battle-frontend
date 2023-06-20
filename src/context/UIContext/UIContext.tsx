import { createContext } from 'react';
import { SoundSettings } from '../../interfaces';

interface ContextProps {
    soundSettings: SoundSettings;
    changeSoundSettings: (data: SoundSettings) => void;
}

export const UIContext = createContext({} as ContextProps);
