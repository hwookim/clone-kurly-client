import request from './utils/request';

const promotions = {
  getAll() {
    return request.get('/promotions');
  },
};

export default promotions;
