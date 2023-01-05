import { FETCH_CATEGORIES } from '../actions/types';

const initialState = [];

const categoryReducer = (categories = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_CATEGORIES:
            return payload;
    
        default:
            return categories;
    }
};

export default categoryReducer;