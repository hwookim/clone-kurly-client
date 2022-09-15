import request from './utils/request';

const promotions = {
  async getAll() {
    const { data } = await request.get('/promotions');
    return data;
  },
};

export default promotions;
