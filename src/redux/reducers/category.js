import { FETCH_CATEGORIES } from '../actions/types';

const category = JSON.parse(localStorage.getItem("category"));

const initialState = category
    ? category : [];

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