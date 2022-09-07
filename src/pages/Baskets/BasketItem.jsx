import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import AmountInput from '../../components/AmountInput';
import Checkbox from './Checkbox';

import auth from '../../utils/auth';

import './BasketItem.scss';

export default function BasketItem({
  basket,
  check,
  onChangeAmount,
  onSelect,
  onRemove,
}) {
  const { id, product, amount: defaultAmount } = basket;
  const [amount, setAmount] = useState(defaultAmount);
  const price = useMemo(() => product.price * amount, [amount, product]);
  const salesPrice = useMemo(
    () => (product.salesPrice ? product.salesPrice * amount : null),
    [amount, product]
  );
  const isLoggedIn = useMemo(() => auth.isLoggedIn(), []);

  const handleAmountInput = (changed) => {
    setAmount(changed);
    onChangeAmount(id, changed);
  };

  const handleSelect = () => {
    onSelect(id);
  };

  const handleClickRemoveButton = () => {
    onRemove(id);
  };

  return (
    <li className="basket-item">
      <Checkbox value={check} onChange={handleSelect} />
      <Link to={`/products/${product.id}`} className="basket-item__thumbnail">
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className="basket-item__title">{product.title}</div>
      <AmountInput value={amount} onChange={handleAmountInput} />
      <div className="basket-item__price">
        <div className="basket-item__price__sales">
          {isLoggedIn && salesPrice
            ? salesPrice.toLocaleString('ko-KR')
            : price.toLocaleString('ko-KR')}
          원
        </div>
        {isLoggedIn && salesPrice && (
          <div className="basket-item__price__origin">
            {price.toLocaleString('ko-KR')}
          </div>
        )}
      </div>
      <button className="basket-item__remove" onClick={handleClickRemoveButton}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </li>
  );
}
