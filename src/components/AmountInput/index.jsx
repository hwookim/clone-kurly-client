import React from 'react';

import './AmountInput.scss';

export default function AmountInput({ value, onChange }) {
  const onClickAmountButton = (change) => () => {
    if (value + change <= 0) {
      return;
    }
    onChange(value + change);
  };

  return (
    <div className="amount-input">
      <button onClick={onClickAmountButton(-1)} disabled={value === 1}>
        -
      </button>
      {value}
      <button onClick={onClickAmountButton(+1)}>+</button>
    </div>
  );
}
