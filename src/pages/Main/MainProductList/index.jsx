import React from 'react';
import { Link } from 'react-router-dom';
import './MainProductList.scss';

export default function MainProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(({ id, thumbnail, title, price }) => (
        <Link key={title + id} to={`/products/${id}`} className="product-list-item">
          <div className="product-list-item__thumbnail">
            <img src={thumbnail} alt="title" className="product-list-item__thumbnail__img" />
          </div>
          <div className="product-list-item__info">
            <h3 className="product-list-item__info__title">{title}</h3>
            <div className="product-list-item__info__price">{parseInt(price).toLocaleString('ko-KR')}원</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
