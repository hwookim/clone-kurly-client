import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import apis from '../../apis';

import './ProductListItem.scss';

export default function ProductListItem({ product }) {
  const { id, title, thumbnail, price, discount } = product;
  const originPrice = useMemo(() => price.toLocaleString('ko-KR'), [price]);
  const salesPrice = useMemo(
    () => (discount ? (price * (1 - discount)).toLocaleString('ko-KR') : originPrice),
    [discount, originPrice, price]
  );
  const navigate = useNavigate();

  const handleClickProduct = () => {
    navigate(`/products/${id}`);
  };

  const handleClickBasketButton = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await apis.baskets.create(id);
    },
    [id]
  );

  return (
    <div className="product-list-item" onClick={handleClickProduct}>
      <div className="product-list-item__thumbnail">
        <img src={thumbnail} alt="title" className="product-list-item__thumbnail__img" />
        <button className="product-list-item__thumbnail__btn" onClick={handleClickBasketButton}>
          <span className="product-list-item__thumbnail__btn__icon material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
      <div className="product-list-item__info">
        <h3 className="product-list-item__info__title">{title}</h3>
        <div className="product-list-item__info__price">
          {discount && <span className="product-list-item__info__price__discount">{discount * 100}%</span>}
          <span className="product-list-item__info__price__sales">{salesPrice}원</span>
          {discount && <div className="product-list-item__info__price__origin">{originPrice}원</div>}
        </div>
      </div>
    </div>
  );
}
