import React, { useEffect, useState } from 'react';

import Button from '../../components/Button';
import Checkbox from './Checkbox';
import BasketItem from './BasketItem';

import api from '../../utils/api';

import './BasketsPage.scss';

export default function BasketsPage() {
  const [baskets, setBaskets] = useState([]);

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
              <span>0 원</span>
            </div>
            <div className="baskets__content__right__bill__item">
              <span>상품할인금액</span>
              <span>0 원</span>
            </div>
            <div className="baskets__content__right__bill__item">
              <span>배송비</span>
              <span>0 원</span>
            </div>
            <div className="baskets__content__right__bill__total">
              <span>결제예정금액</span>
              <span>
                <span className="baskets__content__right__bill__total__price">0</span> 원
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
