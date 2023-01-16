import api from '../api';

const url = "/api/questions";

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

const questionService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default questionService;