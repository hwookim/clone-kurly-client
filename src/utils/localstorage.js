const STORAGE_KEYS = {
  BASKETS: 'baskets',
};

const localstorage = {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const localStorageData = window.localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : null;
  },

  remove(key) {
    window.localStorage.removeItem(key);
  },

  getBaskets() {
    return localstorage.get(STORAGE_KEYS.BASKETS) || [];
  },

  createBasket(product_id, amount) {
    const baskets = localstorage.getBaskets();
    const existedBasket = baskets.find((baskets) => baskets.product_id === product_id);
    if (existedBasket) {
      localstorage.updateBasket(existedBasket.id, existedBasket.amount + amount);
      return;
    }
    const id = baskets.length > 0 ? baskets[baskets.length - 1].id + 1 : 1;
    localstorage.set(STORAGE_KEYS.BASKETS, [...baskets, { id, product_id, amount }]);
  },

  updateBasket(id, amount) {
    const baskets = localstorage.getBaskets();
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

  removeBasket(id) {
    const baskets = localstorage.get(STORAGE_KEYS.BASKETS) || [];
    if (baskets.length === 1) {
      localstorage.set(STORAGE_KEYS.BASKETS, []);
      return;
    }
    const targetIndex = baskets.findIndex((basket) => basket.id === id);
    localstorage.set(STORAGE_KEYS.BASKETS, baskets.splice(targetIndex, 1));
  },
};

export default localstorage;
