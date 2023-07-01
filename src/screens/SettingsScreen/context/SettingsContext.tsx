import { createContext } from 'react';
import { Country } from '../interfaces';

interface ContextProps {
    currentCountry: Country;
    allCountries: Country[];
    isModalOpen: boolean;
    loadings: {
        loadingCurrent: boolean;
        loadingAll: boolean;
    };
    updateCurrentCountry: (code: string) => Promise<void>;
    toggleModal: () => void;
}

export const SettingsContext = createContext({} as ContextProps);
