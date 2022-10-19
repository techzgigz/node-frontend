import {ADD_SELECTED_COUNTRY} from './selectedCountyTypes';

export const addSelectedCountry = (country) => {
  return {
    type: ADD_SELECTED_COUNTRY,
    country,
  }
}