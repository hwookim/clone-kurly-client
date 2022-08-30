import React  from 'react';
import './Input.scss';

export default function Input({ warning = '', ...args }) {
  return (
    <div className="input">
      <input {...args}></input>
      {warning && <div className="input__warning">{warning}</div>}
    </div>
  );
}
