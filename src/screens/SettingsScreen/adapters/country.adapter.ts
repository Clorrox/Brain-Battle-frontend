import {Country, CountryEndpoint} from '../interfaces';

export const countryAdapter = (country: CountryEndpoint): Country => ({
  code: country.cca2,
  flag: country.flags.png,
  name: country.name.common,
});

export const countryListAdapter = (countries: CountryEndpoint[]): Country[] => {
  return countries.map(country => ({
    code: country.cca2,
    flag: country.flags.png,
    name: country.name.common,
  }));
};
