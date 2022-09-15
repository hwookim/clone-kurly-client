import React, { useCallback, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ProductListItem from '../../components/ProductListItem';

import useQuery from '../../hooks/useQuery';
import apis from '../../apis';

import './ProductsPage.scss';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const isDESC = searchParams.get('order') === 'desc';
  const pages = [...Array(TOTAL_PAGE).keys()].map((no) => no + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const orderProducts = useCallback(
    (isDESC) => (products) => {
      return products.sort((a, b) =>
        isDESC ? b.salesPrice - a.salesPrice : a.salesPrice - b.salesPrice
      );
    },
    []
  );

  const products = useQuery(
    `/products/${searchParams.toString()}`,
    () => apis.products.getAll(searchParams),
    {
      initialData: [],
      onSuccess: orderProducts(isDESC),
    }
  );
  const category = useQuery(
    `/categories/${categoryId}`,
    () => apis.categories.get(categoryId),
    { initialData: { name: '카테고리' } }
  );

  const handleClickOrder = (orderType) => () => {
    setSearchParams({
      category: categoryId,
      order: orderType,
    });
  };

  return (
    <div className="products">
      <h3 className="category-name">{category.name}</h3>
      <div className="products-header">
        <div>총 {products.length}건</div>
        <div className="order-types">
          <span
            className={'order-type ' + (isDESC ? '' : 'active')}
            onClick={handleClickOrder('asc')}
          >
            낮은 가격순
          </span>
          <div className="separator" />
          <span
            className={'order-type ' + (isDESC ? 'active' : '')}
            onClick={handleClickOrder('desc')}
          >
            높은 가격순
          </span>
        </div>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-list-item-wrapper">
            <ProductListItem product={product} />
          </div>
        ))}
      </div>
      <div className="page-list">
        <Link to="" className="page-list-item material-symbols-outlined">
          keyboard_double_arrow_left
        </Link>
        <Link to="" className="page-list-item material-symbols-outlined">
          chevron_left
        </Link>
        {pages.map((no) => (
          <Link
            key={no}
            to=""
            className={'page-list-item ' + (currentPage === no ? 'active' : '')}
          >
            {no}
          </Link>
        ))}
        <Link to="" className="page-list-item material-symbols-outlined">
          chevron_right
        </Link>
        <Link to="" className="page-list-item material-symbols-outlined">
          double_arrow
        </Link>
      </div>
    </div>
  );
}

const TOTAL_PAGE = 10;
