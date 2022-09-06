export const STORAGE_KEYS = {
  BASKETS: 'baskets',
};

const localstorage = {
  set(key, value) {
    const localStorageData = window.localStorage.getItem(key);
    const storageArr = localStorageData ? JSON.parse(localStorageData) : [];
    storageArr.unshift(value);

    window.localStorage.setItem(key, JSON.stringify(storageArr));
  },

  get(key) {
    const localStorageData = window.localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : null;
  },

  remove(key) {
    window.localStorage.removeItem(key);
  },
};

export default localstorage;
