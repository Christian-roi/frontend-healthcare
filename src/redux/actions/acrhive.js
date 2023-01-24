import {
    FETCH_ARCHIVES,
    ACTION_ARCHIVE,
} from './types';

import archiveService from '../../services/archive';

export const fetchArchives = (params) => async dispatch  => {
    try {
        const res = await archiveService.getAll(params);
        localStorage.setItem("archive", JSON.stringify(res.data))

        dispatch({
            type: FETCH_ARCHIVES,
            payload: res.data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const actionArchive = data => async dispatch => {
    try {
        const res = await archiveService.update(data);
        localStorage.removeItem("archive")
        localStorage.setItem("archive", JSON.stringify(res.data))

        dispatch({
            type: ACTION_ARCHIVE,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}