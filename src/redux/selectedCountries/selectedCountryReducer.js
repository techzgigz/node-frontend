import {ADD_SELECTED_COUNTRY} from './selectedCountyTypes';

export const initialState = {
    selectedCountries:[
        {name: 'United Arab Emirates', isoCode: 'AE', flag: '🇺🇸', phonecode: '1', currency: 'USD'},
        {name: 'United States', isoCode: 'US', flag: '🇺🇸', phonecode: '1', currency: 'USD'}
    ] 
}

const selectedCountryReducer = (state = initialState, action ) => {
    switch(action.type){
        case ADD_SELECTED_COUNTRY: return {
                ...state,
                selectedCountries: state.selectedCountries.findIndex(x => x.isoCode===action.country.isoCode)===-1?[...state.selectedCountries,action.country]:state.selectedCountries
            };
        default: return state;
    }
}

export default selectedCountryReducer;