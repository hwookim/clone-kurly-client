import request from './utils/request';

const products = {
  get(id) {
    return request.get(`/products/${id}`);
  },

  getAll(searchParams) {
    return request.get(`/products?${searchParams?.toString()}`);
  },
};

export default products;
