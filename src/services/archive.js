import api from '../api';

const getAll = () => {
    return api.get('/api/archive');
};

const update = (data) => {
    return api.put(`/api/archive`, data);
};

const archiveService = {
    getAll,
    update,
};

export default archiveService;