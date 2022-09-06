import React, { useEffect, useMemo, useState } from 'react';

import Button from '../../components/Button';
import Checkbox from './Checkbox';
import BasketItem from './BasketItem';

import api from '../../utils/api';
import auth from '../../utils/auth';

import './BasketsPage.scss';

export default function BasketsPage() {
  const [baskets, setBaskets] = useState([]);
  const [priceInfo, setPriceInfo] = useState([]);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selected, setSelected] = useState([]);
  const isAllSelected = useMemo(() => baskets.every(({ id }) => selected.includes(id)), [baskets, selected]);
  const isGuest = useMemo(() => !auth.isLoggedIn(), []);

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
      setSelected(baskets.map(({ id }) => id));
    })();
  }, []);

  useEffect(() => {
    const priceInfo = baskets.map(({ id, product, amount }) => ({
      id,
      price: parseInt(product.price),
      discount: parseInt(product.price) * parseFloat(product.discount),
      amount: parseInt(amount),
    }));
    setPriceInfo(priceInfo);
  }, [baskets]);

  useEffect(() => {
    const price = priceInfo.map(({ price, amount }) => price * amount).reduce((a, b) => a + b, 0);
    setPrice(price);

    if (isGuest) {
      setDiscountPrice(0);
      setDeliveryCharge(price >= 40000 ? 0 : 3000);
      return;
    }
    const discountPrice = priceInfo.map(({ discount, amount }) => discount * amount).reduce((a, b) => a + b, 0);
    setDiscountPrice(discountPrice);
  }, [isGuest, priceInfo]);

  useEffect(() => {
    setTotalPrice(price - discountPrice + deliveryCharge);
  }, [price, discountPrice, deliveryCharge]);

  const onChangeAmount = (targetId, value) => {
    const targetIndex = priceInfo.findIndex(({ id }) => id === targetId);
    const changedInfo = {
      ...priceInfo[targetIndex],
      amount: value,
    };
    setPriceInfo((prev) => [...prev.slice(0, targetIndex), changedInfo, ...prev.slice(targetIndex + 1, prev.length)]);
  };

  const handleSelectAll = () => {
    const ids = baskets.map(({ id }) => id);
    setSelected((prev) => (prev.length === 0 ? ids : []));
  };

  const handleSelect = (targetId) => {
    const isNotSelected = !selected.includes(targetId);
    if (isNotSelected) {
      setSelected((prev) => [...prev, targetId]);
      return;
    }
    const changed = selected.filter((id) => targetId !== id);
    setSelected(changed);
  };

  return (
    <div className="baskets">
      <h2 className="baskets__title">장바구니</h2>
      <div className="baskets__content">
        <div className="baskets__content__left">
          <div className="baskets__content__left__buttons">
            <Checkbox value={isAllSelected} onChange={handleSelectAll}>
              전체선택 ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button>선택삭제</button>
          </div>
          <ul className="baskets__content__left__list">
            {baskets.length === 0 ? (
              <li className="baskets__content__left__list__empty">장바구니에 담긴 상품이 없습니다.</li>
            ) : (
              baskets.map((basket) => (
                <BasketItem
                  key={basket.id}
                  basket={basket}
                  check={selected.includes(basket.id)}
                  onChangeAmount={onChangeAmount}
                  onSelect={handleSelect}
                />
              ))
            )}
          </ul>
          <div className="baskets__content__left__buttons">
            <Checkbox value={isAllSelected} onChange={handleSelectAll}>
              전체선택 ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button>선택삭제</button>
          </div>
        </div>
        <div className="baskets__content__right">
          <div className="baskets__content__right__bill">
            <div>
              <span>상품금액</span>
              <span>{price.toLocaleString()} 원</span>
            </div>
            <div className="baskets__content__right__bill__item">
              <span>상품할인금액</span>
              <span>
                {discountPrice > 0 && '-'}
                {discountPrice.toLocaleString()} 원
              </span>
            </div>
            {isGuest && <p className="baskets__content__right__bill__discount-info">로그인 후 할인 금액 적용</p>}
            <div className="baskets__content__right__bill__item">
              <span>배송비</span>
              <span>
                {deliveryCharge > 0 && '+'}
                {deliveryCharge.toLocaleString()} 원
              </span>
            </div>
            {isGuest && deliveryCharge > 0 && (
              <p className="baskets__content__right__bill__delivery-info">
                {40000 - totalPrice}원 추가주문 시, <span>무료배송</span>
              </p>
            )}
            <div className="baskets__content__right__bill__total">
              <span>결제예정금액</span>
              <span>
                <span className="baskets__content__right__bill__total__price">{totalPrice.toLocaleString()}</span> 원
              </span>
            </div>
          </div>
          <Button variant="primary" disabled={selected.length === 0}>
            {selected.length !== 0 ? '주문하기': '상품을 담아주세요'}
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
