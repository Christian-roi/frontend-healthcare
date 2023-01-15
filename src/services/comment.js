import api from '../api';

// Create a new comment with post id
const create = (id,data) => {
    return api.post(`/api/comments/${id}`,data);
}

const getAll = (params) => {
    return api.get('/api/comments',{params});
}

const getByPostId = (id) => {
    return api.get(`/api/comments/post/${id}`);
}

const deleteComment = id => {
    return api.delete(`/api/comments/${id}`);
}

const commentService = {
    getAll,
    create,
    getByPostId,
    deleteComment
}

export default commentService;