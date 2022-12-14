import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AmountInput from '../../components/AmountInput';
import RecentProducts from '../../components/RecentProducts';

import useQuery from '../../hooks/useQuery';
import apis from '../../apis';
import throttle from '../../utils/throttle';
import localstorage from '../../utils/localstorage';

import './ProductPage.scss';
import NotFound from '../NotFound';

export default function ProductPage() {
  const { id } = useParams();
  const product = useQuery(`products/${id}`, () => apis.products.get(id), {
    initialData: {
      title: '',
      thumbnail: '',
      description: '',
      price: 0,
      salesPrice: 0,
    },
    onSuccess: (data) => {
      localstorage.addRecentProducts(id, data.thumbnail);
    },
  });
  const [amount, setAmount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(id)) {
      navigate('/not-found');
    }
  }, [id, navigate]);

  const handleAmountInput = (value) => {
    setAmount(value);
  };

  const handleClickBasketButton = throttle(async () => {
    await apis.baskets.create(id, amount);
  }, 250);

  if (!product.title) {
    return <NotFound />;
  }

  return (
    <article className="product">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-thumbnail"
      />
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          {product.discount && (
            <span className="product-discount">{product.discount * 100}%</span>
          )}
          {product.salesPrice.toLocaleString('ko-Kr')}
          <span className="product-price-unit">원</span>
        </div>
        {product.discount && (
          <div className="product-origin-price">
            {product.price.toLocaleString('ko-KR')}원
          </div>
        )}
        <div className="product-amount">
          <span>구매수량</span>
          <AmountInput value={amount} onChange={handleAmountInput} />
        </div>
        <div className="product-total-price">
          총 상품금액 :
          <span className="product-total-price-value">
            {(product.salesPrice * amount).toLocaleString('ko-KR')}
          </span>
          <span className="product-price-unit">원</span>
        </div>
        <button
          variant="primary"
          className="cart-btn"
          onClick={handleClickBasketButton}
        >
          장바구니 담기
        </button>
      </div>
      <RecentProducts startTop="70" />
    </article>
  );
}
