import {ADD_HOUSE} from './houseTypes';

export const addHouse = (house) => {
  return {
    type: ADD_HOUSE,
    house,
  }
}