import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './ProductsPage.scss';
import { useSearchParams } from 'react-router-dom';
import ProductListItem from '../../components/ProductListItem';
import api from '../../utils/api';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('카테고리');
  const order = useMemo(() => searchParams.get('order'), [searchParams]);

  const convertProduct = useCallback((product) => {
    const { price, discount } = product;
    const salesPrice = discount ? parseInt(price) * (1 - parseFloat(discount)) : parseInt(price);
    return {
      salesPrice,
      ...product,
    };
  }, []);

  const orderProducts = useCallback(
    (products) => {
      if (!order) {
        return products;
      }
      return products.sort((a, b) => (order === 'asc' ? a.salesPrice - b.salesPrice : b.salesPrice - a.salesPrice));
    },
    [order]
  );

  useEffect(() => {
    api.get(`/products?${searchParams.toString()}`).then((data) => {
      const products = data.map((product) => convertProduct(product));
      setProducts(orderProducts(products));
    });
  }, [convertProduct, order, orderProducts, searchParams]);

  useEffect(() => {
    api.get(`/categories/${searchParams.get('category')}`).then((data) => setCategory(data));
  }, [searchParams]);

  const onClickASC = () => {
    setSearchParams({
      category: searchParams.get('category'),
      order: 'asc',
    });
  };

  const onClickDESC = () => {
    setSearchParams({
      category: searchParams.get('category'),
      order: 'desc',
    });
  };

  return (
    <div className="products">
      <h3 className="products__title">{category.name}</h3>
      <div className="products__header">
        <div className="products__header__count">총 {products.length}건</div>
        <div className="products__header__order">
          <span className={'products__header__order__method ' + (order === 'asc' ? 'active' : '')} onClick={onClickASC}>
            낮은 가격순
          </span>
          <div className="products__header__order__separator" />
          <span
            className={'products__header__order__method ' + (order === 'desc' ? 'active' : '')}
            onClick={onClickDESC}
          >
            높은 가격순
          </span>
        </div>
      </div>
      <div className="products__list">
        {products.map((product) => (
          <div key={product.id} className="products__list__item">
            <ProductListItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
