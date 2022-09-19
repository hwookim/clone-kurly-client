import cookie from './cookie';

const auth = {
  set(value) {
    cookie.set('accessToken', value, 7);
  },

  get() {
    return cookie.get('accessToken');
  },

  clear() {
    cookie.remove('accessToken');
  },

  isLoggedIn() {
    return !!auth.get();
  },
};

export default auth;
