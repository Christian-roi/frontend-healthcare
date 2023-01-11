import api from '../api';

const create = data => {
    return api.post('/api/comments', data);
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