import api from '../api';

const url = "/api/archive";

const getAll = (params) => {
    return api.get(url,{params});
};

const update = (data) => {
    return api.put(url, data);
};

const archiveService = {
    getAll,
    update,
};

export default archiveService;