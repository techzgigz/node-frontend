import {ADD_PREVIEW} from './previewItemTypes';

export const previewItem = (data) => {
  return {
    type: ADD_PREVIEW,
    data
  }
}