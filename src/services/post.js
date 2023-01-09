import api from '../api';

const create = data => {
    return api.post('/api/posts', data);
};

const getAll = (params) => {
    return api.get('/api/posts',{params});
};

const get = id => {
    return api.get(`/api/posts/${id}`);
};

const update = (id, data) => {
    return api.put(`/api/posts/${id}`, data);
};

const remove = id => {
    return api.delete(`/api/posts/${id}`);
};

const postService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default postService;