import request from './utils/request';
import auth from '../utils/auth';

const users = {
  async get() {
    if (!auth.isLoggedIn()) {
      return;
    }
    return await request.get('/profile').catch(() => auth.clear());
  },

  async login(values) {
    const accessToken = await request.post('/login', values);
    auth.set(accessToken);
  },

  signup(values) {
    return request.post('/signup', values);
  },
};

export default users;
