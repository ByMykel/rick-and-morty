import Repository from "./Repository";

const resource = "/character";

export default {
    get(id) {
        return Repository.get(`${resource}/${id}`);
    },
    getAll(name, status, gender, page) {
        return Repository.get(`${resource}?name=${name}&status=${status}&gender=${gender}&page=${page}`);
    },
};