import {
    FETCH_CATEGORIES,
} from './types';

import categoryService from '../../services/category';

export const fetchCategories = () => async dispatch => {
    try {
        const res = await categoryService.getAll();
        localStorage.setItem("category", JSON.stringify(res.data))

        dispatch({
            type: FETCH_CATEGORIES,
            payload: res.data,
        });
    } catch (error) {
        console.error(error);
    }
};