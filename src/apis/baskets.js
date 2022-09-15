import request from './utils/request';
import apis from './index';
import auth from '../utils/auth';
import localstorage from '../utils/localstorage';

const baskets = {
  async create(product_id, amount = 1) {
    const isGuest = !auth.isLoggedIn();
    if (isGuest) {
      localstorage.createBasket(product_id, amount);
      return;
    }
    return request.post('/baskets', { product_id, amount });
  },

  async getAll() {
    const isGuest = !auth.isLoggedIn();
    const baskets = isGuest
      ? localstorage.getBaskets()
      : await request.get('/baskets').then(({ data }) => data);

    const getProductPromise = baskets.map(({ product_id }) =>
      apis.products.get(product_id)
    );
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
      localstorage.updateBasket(id, amount);
      return;
    }
    return request.put(`/baskets/${id}`, { amount });
  },

  async remove(id) {
    const isGuest = !auth.isLoggedIn();
    if (isGuest) {
      localstorage.removeBasket(id);
      return;
    }
    return request.delete(`/baskets/${id}`);
  },
};

export default baskets;
