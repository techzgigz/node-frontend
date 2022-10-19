import {ADD_FILTERS} from './filtersTypes';

export const initialState = {
    filters: {
        country: null,
        state: null,
        location: null,
        propertyType: "",
        minPrice: 0,
        maxPrice: 1000000000,
    }
}

const filtersReducer = (state = initialState, action ) => {
    switch(action.type){
        case ADD_FILTERS: return {
                ...state,
                filters: action.filters
            };
        default: return state;
    }
}

export default filtersReducer;