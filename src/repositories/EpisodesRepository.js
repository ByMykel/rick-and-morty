import Repository from "./Repository";

const resource = "/episode";

export default {
    get(id) {
        return Repository.get(`${resource}/${id}`);
    }
};