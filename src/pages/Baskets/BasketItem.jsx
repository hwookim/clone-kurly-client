import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AmountInput from '../../components/AmountInput';
import Checkbox from './Checkbox';

import './BasketItem.scss';

export default function BasketItem({ basket, onChangeAmount }) {
  const { id, product, amount } = basket;
  const [value, setValue] = useState(amount);

  const onChange = (changed) => {
    setValue(changed);
    onChangeAmount(id, changed);
  };

  return (
    <li className="basket-item">
      <Checkbox />
      <Link to={`/products/${product.id}`} className="basket-item__thumbnail">
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className="basket-item__title">{product.title}</div>
      <AmountInput value={value} onChange={onChange} />
      <div className="basket-item__price">{product.price.toLocaleString('ko-KR')}원</div>
      <button className="basket-item__delete">
        <span className="material-symbols-outlined">close</span>
      </button>
    </li>
  );
}
