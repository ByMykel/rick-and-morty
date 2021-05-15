import Repository from "./Repository";

const resource = "/character";

export default {
    getAll(page) {
        return Repository.get(`${resource}?page=${page}`);
    },
};
