import React, { useCallback, useMemo } from 'react';
import './ProductListItem.scss';
import { useNavigate } from 'react-router-dom';

export default function ProductListItem({ product }) {
  const { id, title, thumbnail, price, discount } = product;
  const originPrice = useMemo(() => parseInt(price).toLocaleString('ko-KR'), [price]);
  const salesPrice = useMemo(
    () => (discount ? (parseInt(price) * (1 - parseFloat(discount))).toLocaleString('ko-KR') : originPrice),
    [discount, originPrice, price]
  );
  const navigate = useNavigate();

  const onClickProduct = () => {
    navigate(`/products/${id}`);
  };

  const onClickCartButton = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div className="product-list-item">
      <div className="product-list-item__content" onClick={onClickProduct}>
        <div className="product-list-item__content__thumbnail">
          <img src={thumbnail} alt="title" className="product-list-item__content__thumbnail__img" />
          <button className="product-list-item__content__thumbnail__btn" onClick={onClickCartButton}>
            <span className="product-list-item__content__thumbnail__btn__icon material-symbols-outlined">
              shopping_cart
            </span>
          </button>
        </div>
        <div className="product-list-item__content__info">
          <h3 className="product-list-item__content__info__title">{title}</h3>
          <div className="product-list-item__content__info__price">
            {discount && <span className="product-list-item__content__info__price__discount">{discount * 100}%</span>}
            <span className="product-list-item__content__info__price__sales">{salesPrice}원</span>
            {discount && <div className="product-list-item__content__info__price__origin">{originPrice}원</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
