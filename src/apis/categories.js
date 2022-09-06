import request from './utils/request';

const categories = {
  get(id) {
    return request.get(`/categories/${id}`);
  },

  getAll() {
    return request.get('/categories');
  },
};

export default categories;
