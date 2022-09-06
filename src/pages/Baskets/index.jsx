import React from 'react';
import './BasketsPage.scss';
import Button from '../../components/Button';

export default function BasketsPage() {
  return (
    <div className="baskets">
      <h2 className="baskets__title">장바구니</h2>
      <div className="baskets__content">
        <div className="baskets__content__left">
          <div className="baskets__content__left__buttons">
            <label>
              <input type="checkbox" />
              전체선택 (0/0)
            </label>
            <span className="baskets__content__left__buttons__separator" />
            <button>선택삭제</button>
          </div>
          <div className="baskets__content__left__items">
            <div className="baskets__content__left__items__empty">장바구니에 담긴 상품이 없습니다.</div>
          </div>
          <div className="baskets__content__left__buttons">
            <label>
              <input type="checkbox" />
              전체선택 (0/0)
            </label>
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
