import React, { useEffect, useMemo, useState } from 'react';

import Button from '../../components/Button';
import Checkbox from './Checkbox';
import BasketItem from './BasketItem';

import api from '../../utils/api';
import auth from '../../utils/auth';

import './BasketsPage.scss';

export default function BasketsPage() {
  const [baskets, setBaskets] = useState([]);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const isLoggedIn = useMemo(() => auth.isLoggedIn(), []);

  useEffect(() => {
    (async () => {
      const result = await api.get('/baskets');
      const getProductPromise = result.map(({ product_id }) => api.get(`/products/${product_id}`));
      const products = await Promise.all(getProductPromise);

      const baskets = result.map(({ product_id, ...basket }) => ({
        ...basket,
        product: products.find(({ id }) => id === product_id),
      }));
      setBaskets(baskets);
    })();
  }, []);

  useEffect(() => {
    const priceInfo = baskets.map(({ product, amount }) => ({
      price: parseInt(product.price),
      discount: parseInt(product.price) * parseFloat(product.discount),
      amount: parseInt(amount),
    }));
    const price = priceInfo.map(({ price, amount }) => price * amount).reduce((a, b) => a + b, 0);
    setPrice(price);
    if (!isLoggedIn) {
      setDiscountPrice(0);
      setDeliveryCharge(price >= 40000 ? 3000 : 0);
      return;
    }
    const discountPrice = priceInfo.map(({ discount, amount }) => discount * amount).reduce((a, b) => a + b, 0);
    setDiscountPrice(discountPrice);
  }, [baskets, isLoggedIn]);

  useEffect(() => {
    setTotalPrice(price - discountPrice + deliveryCharge);
  }, [price, discountPrice, deliveryCharge]);

  return (
    <div className="baskets">
      <h2 className="baskets__title">장바구니</h2>
      <div className="baskets__content">
        <div className="baskets__content__left">
          <div className="baskets__content__left__buttons">
            <Checkbox>전체선택 (0/0)</Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button>선택삭제</button>
          </div>
          <ul className="baskets__content__left__list">
            {baskets.length === 0 ? (
              <li className="baskets__content__left__list__empty">장바구니에 담긴 상품이 없습니다.</li>
            ) : (
              baskets.map((basket) => <BasketItem key={basket.id} basket={basket} />)
            )}
          </ul>
          <div className="baskets__content__left__buttons">
            <Checkbox>전체선택 (0/0)</Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button>선택삭제</button>
          </div>
        </div>
        <div className="baskets__content__right">
          <div className="baskets__content__right__bill">
            <div className="baskets__content__right__bill__item">
              <span>상품금액</span>
              <span>{price.toLocaleString()} 원</span>
            </div>
            <div className="baskets__content__right__bill__item">
              <span>상품할인금액</span>
              <span>-{discountPrice.toLocaleString()} 원</span>
            </div>
            <div className="baskets__content__right__bill__item">
              <span>배송비</span>
              <span>{deliveryCharge.toLocaleString()} 원</span>
            </div>
            <div className="baskets__content__right__bill__total">
              <span>결제예정금액</span>
              <span>
                <span className="baskets__content__right__bill__total__price">{totalPrice.toLocaleString()}</span> 원
              </span>
            </div>
          </div>
          <Button variant="primary" disabled>
            상품을 담아주세요
          </Button>
          <ul>
            <li>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</li>
            <li>[마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
