import request from './utils/request';

const categories = {
  get(id) {
    return request.get(`/categories/${id}`);
  },

  async getAll() {
    const { data } = await request.get('/categories');
    return data
      .filter((category) => !category.parent_id)
      .map((category) => ({
        ...category,
        sub_categories: data.filter(
          ({ parent_id }) => parent_id === category.id
        ),
      }));
  },
};

export default categories;
