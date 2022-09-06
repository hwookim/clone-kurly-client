import request from './utils/request';
import auth from '../utils/auth';

const users = {
  get() {
    return request.get('/users').catch(() => auth.clear());
  },

  login(values) {
    return request.post('/login', values);
  },
};

export default users;
