import React from 'react';
import './index.scss';

export default function Input({ id, name, placeholder = '', type = 'text', warning = '' }) {
  return (
    <div className="common-input">
      <input id={id} name={name} placeholder={placeholder} type={type}></input>
      {warning && <div className="warning">{warning}</div>}
    </div>
  );
}
