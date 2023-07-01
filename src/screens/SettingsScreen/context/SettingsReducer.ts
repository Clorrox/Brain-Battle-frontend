import {Country} from '../interfaces';
import {SettingsState} from './SettingsProvider';

type actionType =
  | {type: 'update-current'; payload: Country}
  | {type: 'get-all-countries'; payload: Country[]}
  | {type: 'toggle-modal'};

export const SettingsReducer = (
  state: SettingsState,
  action: actionType,
): SettingsState => {
  switch (action.type) {
    case 'update-current':
      return {
        ...state,
        currentCountry: action.payload,
      };
    case 'get-all-countries':
      return {
        ...state,
        allCountries: action.payload,
      };
    case 'toggle-modal':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };

    default:
      return state;
  }
};
