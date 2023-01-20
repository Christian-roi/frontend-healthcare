import api from '../api';

const url = "/api/archive";

const getAll = () => {
    return api.get(url);
};

const update = (data) => {
    return api.put(url, data);
};

const archiveService = {
    getAll,
    update,
};

export default archiveService;