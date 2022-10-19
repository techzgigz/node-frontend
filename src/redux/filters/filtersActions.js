import { ADD_FILTERS } from "./filtersTypes"

export const addFilters = (filters) => {
  return {
    type: ADD_FILTERS,
    filters,
  }
}