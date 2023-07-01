import axios from 'axios';
import {CountryDefaultState, CountryEndpoint} from '../interfaces';
import {countryAdapter, countryListAdapter} from '../adapters';

export const getCountry = async (countryCode: string) => {
  try {
    const {data} = await axios.get<CountryEndpoint>(
      `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,cca2,flags`,
    );
    return countryAdapter(data);
  } catch (error) {
    return CountryDefaultState;
  }
};

export const getAllCountry = async () => {
  try {
    const {data} = await axios.get<CountryEndpoint[]>(
      'https://restcountries.com/v3.1/all?fields=name,cca2,flags',
    );
    return countryListAdapter(data);
  } catch (error) {
    return [];
  }
};
