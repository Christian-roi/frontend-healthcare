import {
    FETCH_ARCHIVES,
    ACTION_ARCHIVE,
} from '../actions/types';

const initialState = [];

const archiveReducer = (archives = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ARCHIVES:
            return payload;

        // case ACTION_ARCHIVE:
        //     return [...archives, payload];
    
        default:
            return archives;
    }
};

export default archiveReducer;