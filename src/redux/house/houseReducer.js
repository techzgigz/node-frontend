import {ADD_HOUSE} from './houseTypes';
import { SEARCH_HOUSE } from './houseTypes';

export const category = {
    Residential: 1,
    Commercial: 2
}

export const propertyType = {
    Apartment: 1,
    Villa: 2,
    IndependentHouse: 3,
    Land: 4
}

export const timeFrame = {
    Monthly: 1,
    Yearly: 2
}

export const propertySizeType = {
    sqm: 1,
    acer: 2
}

export const initialState = {
   houses:[]
}

const houseReducer = (state = initialState, action ) => {
    switch(action.type){
        case ADD_HOUSE: {
            return {
                ...state,
                houses: [...action.house]
                //houses: [action.house,...state.houses]
            };}
        default: return state;
    }
}

const searchReducer = (state = initialState, action) =>{
    switch(action.type){
        case SEARCH_HOUSE: 
        return{
            ...state,
            houses: state.houses
        }
        default: return state;
    }
}

export default houseReducer;