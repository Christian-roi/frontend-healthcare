import {
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from './types';

import commentService from '../../services/comment';

export const addComment = (postId, userId, data) => dispatch => {
    return commentService.create(postId, userId, data).then(
        response => {
            dispatch({
                type: ADD_COMMENT_SUCCESS,
                payload: response.data
            });
            return Promise.resolve();
        },
        error => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADD_COMMENT_FAIL,
                payload: message
            });
            return Promise.reject();
        }
    );
};

export const fetchComments = (postId) => dispatch => {
    return commentService.getByPostId(postId).then(
        response => {
            dispatch({
                type: FETCH_COMMENTS_SUCCESS,
                payload: response.data
            });
            return Promise.resolve();
        },
        error => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FETCH_COMMENTS_FAIL,
                payload: message
            });
            return Promise.reject();
        }
    );
};