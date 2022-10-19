import {ADD_PREVIEW} from './previewItemTypes';
import { timeFrame, category, propertySizeType, propertyType } from '../../data/houses';

export const initialState = {
    preview: {
        timeFrame: timeFrame.Monthly,
        subsciptionDate: new Date(),
        currentlySubscribed: true,
        country: '',
        state: '',
        location: '',
        pincode: '',
        category: category.Residential,
        propertySize: '',
        propertySizeType: propertySizeType.sqm,
        propertyType: propertyType.Apartment,
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        contactName: '',
        contactNumber: '',
        contactEmail: '',
        overview: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: ''
    }
}

const previewItemReducer = (state = initialState, action ) => {
    switch(action.type){
        case ADD_PREVIEW: return {
                ...state,
                preview: action.data
            };
        default: return state;
    }
}

export default previewItemReducer;