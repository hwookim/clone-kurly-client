import request from './utils/request';

const convertProduct = (data) => {
  const product = {
    ...data,
    price: parseInt(data.price),
    salesPrice: parseInt(data.price),
  };

  if (product.discount) {
    product.discount = parseFloat(product.discount);
    product.salsePrice = product.price * (1 - product.discount);
  }

  return product;
};

const products = {
  async get(id) {
    const data = await request.get(`/products/${id}`);
    return convertProduct(data);
  },

  async getAll(searchParams) {
    const query = searchParams ? `?${searchParams?.toString()}` : '';
    const data = await request.get('/products' + query);
    return data.map((product) => convertProduct(product));
  },
};

export default products;
