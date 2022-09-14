import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import AmountInput from '../../components/AmountInput';
import Checkbox from './Checkbox';

import auth from '../../utils/auth';

import './BasketItem.scss';

export default function BasketItem({
  basket,
  checked,
  onChangeAmount,
  onSelect,
  onRemove,
}) {
  const { id, product, amount: defaultAmount } = basket;

  const [amount, setAmount] = useState(defaultAmount);
  const isLoggedIn = useMemo(() => auth.isLoggedIn(), []);

  const price = product.price * amount;
  const salesPrice = product.salesPrice ? product.salesPrice * amount : null;

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
      <Checkbox value={checked} onChange={handleSelect} />
      <Link to={`/products/${product.id}`} className="thumbnail">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="thumbnail-img"
        />
      </Link>
      <div className="basket-title">{product.title}</div>
      <AmountInput value={amount} onChange={handleAmountInput} />
      <div className="basket-price">
        <div className="basket-sales">
          {isLoggedIn && salesPrice
            ? salesPrice.toLocaleString('ko-KR')
            : price.toLocaleString('ko-KR')}
          원
        </div>
        {isLoggedIn && salesPrice && (
          <div className="basket-origin">{price.toLocaleString('ko-KR')}</div>
        )}
      </div>
      <button className="basket-remove-btn" onClick={handleClickRemoveButton}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </li>
  );
}
