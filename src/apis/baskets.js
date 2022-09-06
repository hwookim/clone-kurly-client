import request from './utils/request';
import apis from './index';
import auth from '../utils/auth';
import localstorage, { STORAGE_KEYS } from '../utils/localstorage';

const baskets = {
  async getAll() {
    const isGuest = !auth.isLoggedIn();
    const baskets = isGuest ? localstorage.get(STORAGE_KEYS.BASKETS) || [] : await request.get('/baskets');
    const getProductPromise = baskets.map(({ product_id }) => apis.products.get(product_id));
    const products = await Promise.all(getProductPromise);

    return baskets.map(({ product_id, ...basket }) => ({
      ...basket,
      amount: parseInt(basket.amount),
      product: products.find(({ id }) => id === product_id),
    }));
  },

  async update(id, amount) {
    if (auth.isLoggedIn()) {
      return request.put(`/baskets/${id}`, { amount });
    }
    const baskets = localstorage.get(STORAGE_KEYS.BASKETS) || [];
    const targetIndex = baskets.findIndex((basket) => basket.id === id);
    const changedBasket = {
      ...baskets[targetIndex],
      amount,
    };
    const changed = [
      ...baskets.slice(0, targetIndex),
      changedBasket,
      ...baskets.slice(targetIndex + 1, baskets.length),
    ];
    localstorage.set(STORAGE_KEYS.BASKETS, changed);
  },

  async remove(id) {
    if (auth.isLoggedIn()) {
      return request.delete(`/baskets/${id}`);
    }
    const baskets = localstorage.get(STORAGE_KEYS.BASKETS) || [];
    const targetIndex = baskets.findIndex((basket) => basket.id === id);
    localstorage.set(STORAGE_KEYS.BASKETS, baskets.splice(targetIndex, 1));
  },
};

export default baskets;
