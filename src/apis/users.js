import request from './utils/request';
import auth from '../utils/auth';

const users = {
  get() {
    return request.get('/users').catch(() => auth.clear());
  },

  async login(values) {
    const { accessToken } = await request.post('/login', values);
    auth.set(accessToken);
  },

  signup(values) {
    return request.post('/login', values);
  },
};

export default users;
