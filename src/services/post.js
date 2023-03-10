import api from '../api';

const url = "/api/posts";

const create = data => {
    return api.post(url, data);
};

const getAll = (params) => {
    return api.get(url,{params});
};

const get = id => {
    return api.get(`${url}/${id}`);
};

const update = (id, data) => {
    return api.put(`${url}/${id}`, data);
};

const remove = id => {
    return api.delete(`${url}/${id}`);
};

const postService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default postService;