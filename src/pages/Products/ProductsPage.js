import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ProductListItem from '../../components/ProductListItem';
import RecentProducts from '../../components/RecentProducts';

import useQuery from '../../hooks/useQuery';
import apis from '../../apis';

import './ProductsPage.scss';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const currentPage = parseInt(searchParams.get('page'));
  const categoryId = searchParams.get('category');
  const isDESC = searchParams.get('order') === 'desc';
  const pages = [...Array(totalPage).keys()].map((no) => no + 1);

  const products = useQuery(
    `/products/${searchParams.toString()}`,
    () => apis.products.getAll(searchParams),
    {
      initialData: [],
      onSuccess: (result) => {
        setTotalPage(result.meta.pagenation.total_page);
      },
    }
  );

  const category = useQuery(
    `/categories/${categoryId}`,
    () => apis.categories.get(categoryId),
    { initialData: { name: '카테고리' } }
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [searchParams]);

  const handleClickOrder = (orderType) => () => {
    setSearchParams({
      category: categoryId,
      order: orderType,
    });
  };

  const onClickPageLink = (index) => (event) => {
    event.preventDefault();
    if (currentPage === index) return;

    searchParams.set('page', index);
    setSearchParams(searchParams);
  };

  const onClickPrevPageLink = (event) => {
    event.preventDefault();
    if (currentPage === 1) return;

    searchParams.set('page', currentPage - 1);
    setSearchParams(searchParams);
  };

  const onClickNextPageLink = (event) => {
    event.preventDefault();
    if (currentPage === totalPage) return;

    searchParams.set('page', currentPage + 1);
    setSearchParams(searchParams);
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
        <Link
          to=""
          className="page-list-item material-symbols-outlined"
          onClick={onClickPageLink(1)}
        >
          keyboard_double_arrow_left
        </Link>
        <Link
          to=""
          className="page-list-item material-symbols-outlined"
          onClick={onClickPrevPageLink}
        >
          chevron_left
        </Link>
        {pages.map((no) => (
          <Link
            key={no}
            to=""
            className={'page-list-item ' + (currentPage === no ? 'active' : '')}
            onClick={onClickPageLink(no)}
          >
            {no}
          </Link>
        ))}
        <Link
          to=""
          className="page-list-item material-symbols-outlined"
          onClick={onClickNextPageLink}
        >
          chevron_right
        </Link>
        <Link
          to=""
          className="page-list-item material-symbols-outlined"
          onClick={onClickPageLink(totalPage)}
        >
          double_arrow
        </Link>
      </div>
      <RecentProducts startTop="82" />
    </div>
  );
}
