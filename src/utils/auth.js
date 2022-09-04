import cookie from './cookie';

const auth = {
  set(value) {
    cookie.set('accessToken', value);
  },
  get() {
    return cookie.get('accessToken');
  },
};

export default auth;
