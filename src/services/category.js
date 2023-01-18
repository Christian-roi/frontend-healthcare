import api from '../api';

const url = "/api/category";

const create = data => {
    return api.post(url, data);
};

const getAll = () => {
    return api.get(url);
};

const update = (id, data) => {
    return api.put(`${url}/${id}`, data);
};

const remove = id => {
    return api.delete(`${url}/${id}`);
};

const getAllCategories = () => {
    return api.get('/api/getallcat');
};

const categoryService = {
    getAll,
    create,
    update,
    remove,
    getAllCategories
};

export default categoryService;