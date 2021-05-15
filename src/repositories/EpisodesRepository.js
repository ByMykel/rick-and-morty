import Repository from "./Repository";

const resource = "/episode";

export default {
    getAll(page) {
        return Repository.get(`${resource}?page=${page}`);
    }
};