import api from '../api';

const url = "/api/answers";

const create = (questionId, data) => {
    return api.post(`${url}/${questionId}`, data);
};

const update = (id, data) => {
    return api.put(`${url}/${id}`, data);
};

const remove = id => {
    return api.delete(`${url}/${id}`);
};

const answerService = {
    create,
    update,
    remove
};

export default answerService;