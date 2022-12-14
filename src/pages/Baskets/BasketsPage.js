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
    <div className="baskets-page">
      <h2 className="title">????????????</h2>
      <div className="content">
        <div className="content-left">
          <div className="btns">
            <Checkbox
              value={isAllSelected}
              disabled={isEmpty}
              onChange={handleSelectAll}
            >
              ???????????? ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="separator" />
            <button className="remove-btn" disabled={isEmpty}>
              ????????????
            </button>
          </div>
          <ul className="basket-list">
            {baskets.length === 0 ? (
              <li className="empty">??????????????? ?????? ????????? ????????????.</li>
            ) : (
              baskets.map((basket) => (
                <BasketItem
                  key={basket.id}
                  basket={basket}
                  checked={selected.includes(basket.id)}
                  onChangeAmount={handleAmountInput}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                />
              ))
            )}
          </ul>
          <div className="btns">
            <Checkbox
              value={isAllSelected}
              disabled={isEmpty}
              onChange={handleSelectAll}
            >
              ???????????? ({selected.length}/{baskets.length})
            </Checkbox>
            <span className="separator" />
            <button className="remove-btn" disabled={isEmpty}>
              ????????????
            </button>
          </div>
        </div>
        <div className="content-right">
          <div className="bill">
            <div>
              <span>????????????</span>
              <span>{price.toLocaleString()} ???</span>
            </div>
            <div className="bill-item">
              <span>??????????????????</span>
              <span>
                {!isGuest && discountPrice > 0 && '-'}
                {isGuest ? 0 : discountPrice.toLocaleString()} ???
              </span>
            </div>
            {isGuest && discountPrice > 0 && (
              <p className="discount-info">????????? ??? ?????? ?????? ??????</p>
            )}
            <div className="bill-item">
              <span>?????????</span>
              <span>
                {deliveryCharge > 0 && '+'}
                {deliveryCharge.toLocaleString()} ???
              </span>
            </div>
            {isGuest && deliveryCharge > 0 && (
              <p className="delivery-info">
                {40000 - (totalPrice - deliveryCharge)}??? ???????????? ???,{' '}
                <span>????????????</span>
              </p>
            )}
            <div className="total">
              <span>??????????????????</span>
              <span>
                <span className="total-price">
                  {totalPrice.toLocaleString()}
                </span>{' '}
                ???
              </span>
            </div>
          </div>
          <button className="order-btn" disabled={selected.length === 0}>
            {selected.length !== 0 ? '????????????' : '????????? ???????????????'}
          </button>
          <ul className="info">
            <li className="info-item">
              [????????????] ????????? ???????????? ?????? ?????? ???????????????.
            </li>
            <li className="info-item">
              [???????????? &gt; ???????????? ???????????????] ?????? ?????? ???????????? ???
              ????????????.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
