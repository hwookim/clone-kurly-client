import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductListItem from '../../components/ProductListItem';

import useQuery from '../../hooks/useQuery';
import apis from '../../apis';

import './ProductsPage.scss';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isASC = useMemo(
    () => searchParams.get('order') === 'asc',
    [searchParams]
  );

  const orderProducts = useCallback(
    (isASC) => (products) => {
      return products.sort((a, b) =>
        isASC ? a.salesPrice - b.salesPrice : b.salesPrice - a.salesPrice
      );
    },
    []
  );

  const products = useQuery(
    `/products/${searchParams.toString()}`,
    () => apis.products.getAll(searchParams),
    {
      initialData: [],
      onSuccess: orderProducts(isASC),
    }
  );
  const category = useQuery(
    `/categories/${searchParams.get('category')}`,
    () => apis.categories.get(searchParams.get('category')),
    { initialData: { name: '카테고리' } }
  );

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
              'products__header__order__method ' + (isASC ? 'active' : '')
            }
            onClick={handleClickOrder('asc')}
          >
            낮은 가격순
          </span>
          <div className="products__header__order__separator" />
          <span
            className={
              'products__header__order__method ' + (isASC ? '' : 'active')
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
