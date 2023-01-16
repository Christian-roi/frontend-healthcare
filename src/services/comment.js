import api from '../api';

const url = "/api/comments";

// Create a new comment with post id
const create = (id,data) => {
    return api.post(`${url}/${id}`,data);
}

const getAll = (params) => {
    return api.get(url,{params});
}

const getByPostId = (id) => {
    return api.get(`${url}/post/${id}`);
}

const deleteComment = id => {
    return api.delete(`${url}/${id}`);
}

const commentService = {
    getAll,
    create,
    getByPostId,
    deleteComment
}

export default commentService;