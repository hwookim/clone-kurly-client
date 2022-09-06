import React, { useEffect, useMemo, useState } from 'react';
import './ProductPage.scss';
import { useParams } from 'react-router-dom';
import apis from '../../apis';
import Button from '../../components/Button';
import AmountInput from '../../components/AmountInput';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    thumbnail: '',
    description: '',
    price: 0,
  });
  const [amount, setAmount] = useState(1);

  const onChangeAmount = (value) => {
    setAmount(value);
  };

  useEffect(() => {
    apis.products.get(id).then((data) => setProduct(data));
  }, [id]);

  return (
    <article className="product">
      <img src={product.thumbnail} alt={product.title} className="product__thumbnail" />
      <div className="product__content">
        <h2 className="product__content__title">{product.title}</h2>
        <p className="product__content__description">{product.description}</p>
        <div className="product__content__price">
          {product.discount && (
            <span className="product__content__price__discount">{product.discount * 100}%</span>
          )}
          {product.salesPrice.toLocaleString('ko-Kr')}
          <span className="product__content__price__unit">원</span>
        </div>
        {product.discount && (
          <div className="product__content__origin-price">{product.price.toLocaleString('ko-KR')}원</div>
        )}
        <div className="product__content__amount">
          <span>구매수량</span>
          <AmountInput value={amount} onChange={onChangeAmount} />
        </div>
        <div className="product__content__total-price">
          총 상품금액 :
          <span className="product__content__total-price__value">{(product.salesPrice * amount).toLocaleString('ko-KR')}</span>
          <span className="product__content__total-price__unit">원</span>
        </div>
        <Button variant="primary" className="product__content__cart">
          장바구니 담기
        </Button>
      </div>
    </article>
  );
}
