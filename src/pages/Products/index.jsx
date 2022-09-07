import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductListItem from '../../components/ProductListItem';

import apis from '../../apis';

import './ProductsPage.scss';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('카테고리');
  const order = useMemo(() => searchParams.get('order'), [searchParams]);

  const orderProducts = useCallback((products, order) => {
    if (!order) {
      return products;
    }
    return products.sort((a, b) =>
      order === 'asc'
        ? a.salesPrice - b.salesPrice
        : b.salesPrice - a.salesPrice
    );
  }, []);

  useEffect(() => {
    apis.products
      .getAll(searchParams)
      .then((data) => setProducts(orderProducts(data, order)));
  }, [order, orderProducts, searchParams]);

  useEffect(() => {
    apis.categories
      .get(searchParams.get('category'))
      .then((data) => setCategory(data));
  }, [searchParams]);

  const handleClickOrder = (orderType) => () => {
    setSearchParams({
      category: searchParams.get('category'),
      order: orderType,
    });
  };

  return (
    <div className="products">
      <h3 className="products__title">{category.name}</h3>
      <div className="products__header">
        <div className="products__header__count">총 {products.length}건</div>
        <div className="products__header__order">
          <span
            className={
              'products__header__order__method ' +
              (order === 'asc' ? 'active' : '')
            }
            onClick={handleClickOrder('asc')}
          >
            낮은 가격순
          </span>
          <div className="products__header__order__separator" />
          <span
            className={
              'products__header__order__method ' +
              (order === 'desc' ? 'active' : '')
            }
            onClick={handleClickOrder('desc')}
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
