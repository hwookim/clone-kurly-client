import request from './utils/request';

const convertProduct = (data) => {
  const product = {
    ...data,
    price: parseInt(data.price),
    discount: parseFloat(data.discount),
  };

  if (product.discount) {
    product.salsePrice = product.price * (1 - product.discount);
  }

  return product;
};

const products = {
  async get(id) {
    const data = request.get(`/products/${id}`);
    return convertProduct(data);
  },

  async getAll(searchParams) {
    const data = await request.get(`/products?${searchParams?.toString()}`);
    return data.map((product) => convertProduct(product));
  },
};

export default products;
