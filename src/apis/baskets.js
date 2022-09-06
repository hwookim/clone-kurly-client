import request from "./utils/request";

const baskets = {
  getAll() {
    return request.get('/baskets');
  },
};

export default baskets;
