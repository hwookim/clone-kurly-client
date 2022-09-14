import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from './Checkbox';
import BasketItem from './BasketItem';

import useQuery from '../../hooks/useQuery';
import apis from '../../apis';
import auth from '../../utils/auth';
import debounce from '../../utils/debounce';

import './BasketsPage.scss';

export default function BasketsPage() {
  const [baskets, setBaskets] = useState([]);
  const [priceInfo, setPriceInfo] = useState([]);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [selected, setSelected] = useState([]);
  const isEmpty = useMemo(() => baskets.length === 0, [baskets.length]);
  const isAllSelected = useMemo(
    () =>
      baskets.length > 0 && baskets.every(({ id }) => selected.includes(id)),
    [baskets, selected]
  );
  const isGuest = useMemo(() => !auth.isLoggedIn(), []);
  const totalPrice = useMemo(
    () => price + deliveryCharge - (isGuest ? 0 : discountPrice),
    [deliveryCharge, discountPrice, isGuest, price]
  );

  useQuery('baskets', () => apis.baskets.getAll(), {
    onSuccess: (data) => {
      setBaskets(data);
      setSelected(data.map(({ id }) => id));
    },
  });

  useEffect(() => {
    const priceInfo = baskets.map(({ id, product, amount }) => ({
      id,
      amount,
      price: product.price,
      discount: product.price * product.discount,
    }));
    setPriceInfo(priceInfo);
  }, [baskets]);

  useEffect(() => {
    const selectedBaskets = priceInfo.filter(({ id }) => selected.includes(id));
    const price = selectedBaskets
      .filter(({ id }) => selected.includes(id))
      .map(({ price, amount }) => price * amount)
      .reduce((a, b) => a + b, 0);
    setPrice(price);

    if (priceInfo.length === 0) {
      setDeliveryCharge(0);
      return;
    }

    if (isGuest) {
      setDeliveryCharge(price >= 40000 ? 0 : 3000);
    }
    const discountPrice = selectedBaskets
      .map(({ discount, amount }) => discount * amount)
      .reduce((a, b) => a + b, 0);
    setDiscountPrice(discountPrice);
  }, [isGuest, priceInfo, selected]);

  const updateBasket = debounce(
    async (targetId, value) => await apis.baskets.update(targetId, value),
    250
  );

  const handleAmountInput = async (targetId, value) => {
    const targetIndex = priceInfo.findIndex(({ id }) => id === targetId);
    const changedInfo = {
      ...priceInfo[targetIndex],
      amount: value,
    };
    setPriceInfo((prev) => [
      ...prev.slice(0, targetIndex),
      changedInfo,
      ...prev.slice(targetIndex + 1, prev.length),
    ]);

    updateBasket(targetId, value);
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

  const handleRemove = async (targetId) => {
    const changed = baskets.filter(({ id }) => id !== targetId);
    setBaskets(changed);

    await apis.baskets.remove(targetId);
  };

  return (
    <div className="baskets">
      <h2 className="baskets__title">장바구니</h2>
      <div className="baskets__content">
        <div className="baskets__content__left">
          <div className="baskets__content__left__buttons">
            <Checkbox
              value={isAllSelected}
              disabled={isEmpty}
              onChange={handleSelectAll}
            >
              전체선택 ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button disabled={isEmpty}>선택삭제</button>
          </div>
          <ul className="baskets__content__left__list">
            {baskets.length === 0 ? (
              <li className="baskets__content__left__list__empty">
                장바구니에 담긴 상품이 없습니다.
              </li>
            ) : (
              baskets.map((basket) => (
                <BasketItem
                  key={basket.id}
                  basket={basket}
                  check={selected.includes(basket.id)}
                  onChangeAmount={handleAmountInput}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                />
              ))
            )}
          </ul>
          <div className="baskets__content__left__buttons">
            <Checkbox
              value={isAllSelected}
              disabled={isEmpty}
              onChange={handleSelectAll}
            >
              전체선택 ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="baskets__content__left__buttons__separator" />
            <button disabled={isEmpty}>선택삭제</button>
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
                {!isGuest && discountPrice > 0 && '-'}
                {isGuest ? 0 : discountPrice.toLocaleString()} 원
              </span>
            </div>
            {isGuest && discountPrice > 0 && (
              <p className="baskets__content__right__bill__discount-info">
                로그인 후 할인 금액 적용
              </p>
            )}
            <div className="baskets__content__right__bill__item">
              <span>배송비</span>
              <span>
                {deliveryCharge > 0 && '+'}
                {deliveryCharge.toLocaleString()} 원
              </span>
            </div>
            {isGuest && deliveryCharge > 0 && (
              <p className="baskets__content__right__bill__delivery-info">
                {40000 - (totalPrice - deliveryCharge)}원 추가주문 시,{' '}
                <span>무료배송</span>
              </p>
            )}
            <div className="baskets__content__right__bill__total">
              <span>결제예정금액</span>
              <span>
                <span className="baskets__content__right__bill__total__price">
                  {totalPrice.toLocaleString()}
                </span>{' '}
                원
              </span>
            </div>
          </div>
          <button disabled={selected.length === 0}>
            {selected.length !== 0 ? '주문하기' : '상품을 담아주세요'}
          </button>
          <ul>
            <li>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</li>
            <li>
              [마이컬리 &gt; 주문내역 상세페이지] 에서 직접 취소하실 수
              있습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
