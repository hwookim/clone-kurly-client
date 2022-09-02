import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './ProductListItem.scss';

export default function ProductListItem({ product }) {
  const { id, title, thumbnail, price, discount } = product;
  const originPrice = useMemo(() => parseInt(price).toLocaleString('ko-KR'), [price]);
  const salesPrice = useMemo(
    () => (discount ? (parseInt(price) * (1 - parseFloat(discount))).toLocaleString('ko-KR') : originPrice),
    [discount, originPrice, price]
  );

  return (
    <div className="product-list-item">
      <Link key={title + id} to={`/products/${id}`}>
        <div className="product-list-item__thumbnail">
          <img src={thumbnail} alt="title" className="product-list-item__thumbnail__img" />
        </div>
        <div className="product-list-item__info">
          <h3 className="product-list-item__info__title">{title}</h3>
          <div className="product-list-item__info__price">
            {discount && <span className="product-list-item__info__price__discount">{discount * 100}%</span>}
            <span className="product-list-item__info__price__sales">{salesPrice}원</span>
            {discount && <div className="product-list-item__info__price__origin">{originPrice}원</div>}
          </div>
        </div>
      </Link>
    </div>
  );
}
