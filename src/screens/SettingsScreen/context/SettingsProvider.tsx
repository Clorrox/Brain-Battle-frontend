/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useState, useEffect } from 'react';
import { SettingsContext, SettingsReducer } from './';
import { Country, CountryDefaultState } from '../interfaces';
import { getAllCountry, getCountry } from '../api';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

export interface SettingsState {
    currentCountry: Country;
    allCountries: Country[];
    isModalOpen: boolean;
}

const INITIAL_STATE: SettingsState = {
    currentCountry: CountryDefaultState,
    allCountries: [],
    isModalOpen: false,
}

interface Props {
    children: JSX.Element | JSX.Element[]
}
export const SettingsProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(SettingsReducer, INITIAL_STATE);
    const [loadings, setLoadings] = useState({
        loadingCurrent: false,
        loadingAll: false,
    });
    const {user} = useSelector((s: AppStore) => s.auth);

    const updateCurrentCountry = async(code: string) => {
        setLoadings({...loadings, loadingCurrent: true});

        const newCountry = await getCountry(code);
        dispatch({type: 'update-current', payload: newCountry});

        setLoadings({...loadings, loadingCurrent: false});
    };

    const loadAllCountries = async() => {
        setLoadings({...loadings, loadingAll: true});

        const newCountry = await getAllCountry();
        dispatch({type: 'get-all-countries', payload: newCountry});

        setLoadings({...loadings, loadingAll: false});
    };

    const toggleModal = () => {
        dispatch({type: 'toggle-modal'});
    };

    useEffect(() => {
        loadAllCountries();
    }, []);

    useEffect(() => {
        if (user.country) {
            updateCurrentCountry(user.country);
        }
    }, [user.country]);

    return (
        <SettingsContext.Provider
          value={{
              ...state,
              loadings,
              updateCurrentCountry,
              toggleModal,
          }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
