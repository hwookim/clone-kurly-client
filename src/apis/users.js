import request from './utils/request';

const users = {
  get() {
    return request.get('/users');
  },

  login(values) {
    return request.post('/login', values);
  },
};

export default users;
