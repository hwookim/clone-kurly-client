import React, { useEffect, useState } from 'react';
import './ProductPage.scss';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Button from '../../components/Button';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    thumbnail: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    api.get(`/products/${id}`).then((data) => setProduct(data));
  }, [id]);

  return (
    <article className="product">
      <img src={product.thumbnail} alt={product.title} className="product__thumbnail" />
      <div className="product__content">
        <h2 className="product__content__title">{product.title}</h2>
        <p className="product__content__description">{product.description}</p>
        <div className="product__content__price">
          {product.price.toLocaleString()}
          <span>원</span>
        </div>
        <div className="product__content__amount">
          <span>구매수량</span>
          <div className="product__content__amount__input">
            <button>-</button>
            {1}
            <button>+</button>
          </div>
        </div>
        <div className="product__content__total-price">
          총 상품금액 :<span className="product__content__total-price__value">{product.price.toLocaleString()}</span>
          <span className="product__content__total-price__unit">원</span>
        </div>
        <Button variant="primary" className="product__content__cart">
          장바구니 담기
        </Button>
      </div>
    </article>
  );
}
