import {createStore, combineReducers} from 'redux';
import houseReducer from './house/houseReducer';
import previewItemReducer from './previewItem/previewItemReducer';
import selectedCountryReducer from './selectedCountries/selectedCountryReducer';
import filtersReducer from './filters/filtersReducer';

const rootReducer = combineReducers({
    houses: houseReducer,
    preview: previewItemReducer,
    selectedCountries: selectedCountryReducer,
    filtersReducer: filtersReducer,
})

export const store = createStore(rootReducer);

  