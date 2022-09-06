import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button';
import AmountInput from '../../components/AmountInput';

import apis from '../../apis';

import './ProductPage.scss';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    thumbnail: '',
    description: '',
    price: 0,
    salesPrice: 0,
  });
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    apis.products.get(id).then((data) => setProduct(data));
  }, [id]);

  const handleAmountInput = (value) => {
    setAmount(value);
  };

  const handleClickBasketButton = async () => {
    await apis.baskets.create(id, amount);
  };

  return (
    <article className="product">
      <img src={product.thumbnail} alt={product.title} className="product__thumbnail" />
      <div className="product__content">
        <h2 className="product__content__title">{product.title}</h2>
        <p className="product__content__description">{product.description}</p>
        <div className="product__content__price">
          {product.discount && <span className="product__content__price__discount">{product.discount * 100}%</span>}
          {product.salesPrice.toLocaleString('ko-Kr')}
          <span className="product__content__price__unit">원</span>
        </div>
        {product.discount && (
          <div className="product__content__origin-price">{product.price.toLocaleString('ko-KR')}원</div>
        )}
        <div className="product__content__amount">
          <span>구매수량</span>
          <AmountInput value={amount} onChange={handleAmountInput} />
        </div>
        <div className="product__content__total-price">
          총 상품금액 :
          <span className="product__content__total-price__value">
            {(product.salesPrice * amount).toLocaleString('ko-KR')}
          </span>
          <span className="product__content__total-price__unit">원</span>
        </div>
        <Button variant="primary" className="product__content__cart" onClick={handleClickBasketButton}>
          장바구니 담기
        </Button>
      </div>
    </article>
  );
}
