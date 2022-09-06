import request from './utils/request';
import api from './index';

const baskets = {
  async getAll() {
    const baskets = await request.get('/baskets');
    const getProductPromise = baskets.map(({ product_id }) => api.products.get(product_id));
    const products = await Promise.all(getProductPromise);

    return baskets.map(({ product_id, ...basket }) => ({
      ...basket,
      amount: parseInt(basket.amount),
      product: products.find(({ id }) => id === product_id),
    }));
  },
};

export default baskets;
