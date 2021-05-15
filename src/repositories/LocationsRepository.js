import Repository from "./Repository";

const resource = "/location";

export default {
    getAll(page) {
        return Repository.get(`${resource}?page=${page}`);
    },
};