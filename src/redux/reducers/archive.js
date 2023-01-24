import {
    FETCH_ARCHIVES,
    ACTION_ARCHIVE,
} from '../actions/types';

const archive = JSON.parse(localStorage.getItem("archive"));

const initialState = archive ? archive : [];

const archiveReducer = (archives = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ARCHIVES:
            return payload;

        case ACTION_ARCHIVE:
            return payload;
    
        default:
            return archives;
    }
};

export default archiveReducer;