import request from './utils/request';
import apis from './index';
import auth from '../utils/auth';
import localstorage from '../utils/localstorage';

const baskets = {
  async create(product_id, amount = 1) {
    if (auth.isLoggedIn()) {
      return request.post('/baskets', { product_id, amount });
    }
    localstorage.createBasket(product_id, amount);
  },

  async getAll() {
    const isGuest = !auth.isLoggedIn();
    const baskets = isGuest ? localstorage.getBaskets() : await request.get('/baskets');
    const getProductPromise = baskets.map(({ product_id }) => apis.products.get(product_id));
    const products = await Promise.all(getProductPromise);

    return baskets.map(({ product_id, ...basket }) => ({
      ...basket,
      amount: parseInt(basket.amount),
      product: products.find(({ id }) => id === product_id),
    }));
  },

  async update(id, amount) {
    const isGuest = !auth.isLoggedIn();
    if (isGuest) {
      return localstorage.updateBasket(id, amount);
    }
    return request.put(`/baskets/${id}`, { amount });
  },

  async remove(id) {
    const isGuest = !auth.isLoggedIn();
    if (isGuest) {
      return localstorage.removeBasket();
    }
    return request.delete(`/baskets/${id}`);
  },
};

export default baskets;
