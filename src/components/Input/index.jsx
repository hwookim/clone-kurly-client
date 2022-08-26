import React  from 'react';
import './index.scss';

export default function Input({ warning = '', ...args }) {
  return (
    <div className="common-input">
      <input {...args}></input>
      {warning && <div className="warning">{warning}</div>}
    </div>
  );
}
