import request from './utils/request';

const categories = {
  get(id) {
    return request.get(`/categories/${id}`);
  },

  async getAll() {
    const result = await request.get('/categories');
    return result
      .filter((category) => !category.parent_id)
      .map((category) => ({
        ...category,
        sub_categories: result.filter(
          ({ parent_id }) => parent_id === category.id
        ),
      }));
  },
};

export default categories;
