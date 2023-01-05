import api from '../api';

const create = data => {
    return api.post('/api/category', data);
};

const getAll = () => {
    return api.get('/api/category');
};

const update = (id, data) => {
    return api.put(`/api/category/${id}`, data);
};

const remove = id => {
    return api.delete(`/api/category/${id}`);
};

const categoryService = {
    getAll,
    create,
    update,
    remove
};

export default categoryService;