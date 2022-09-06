import React, { useState } from 'react';
import './CheckBox.scss';

export default function Checkbox({ children, checked, value, ...args }) {
  const [isChecked, setIsChecked] = useState(checked || value || false);

  const onChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label className="checkbox">
      <input type="checkbox" checked={isChecked} {...args} value={isChecked} onChange={onChange} />
      <span className={'material-symbols-outlined checkbox__icon' + (isChecked ? '--checked' : '')}>check_circle</span>
      {children}
    </label>
  );
}
