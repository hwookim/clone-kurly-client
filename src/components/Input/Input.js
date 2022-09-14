import React from 'react';

import './Input.scss';

export default function Input({ warning = '', ...args }) {
  return (
    <div className="input">
      <input {...args} />
      {warning && <div className="input-warning">{warning}</div>}
    </div>
  );
}
