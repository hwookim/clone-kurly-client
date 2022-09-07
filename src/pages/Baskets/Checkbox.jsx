import React, { useEffect, useState } from 'react';

import './CheckBox.scss';

export default function Checkbox({
  children,
  checked,
  value,
  onChange,
  ...args
}) {
  const [isChecked, setIsChecked] = useState(checked || value || false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handleChange = () => {
    const value = !isChecked;
    setIsChecked(value);
    onChange(value);
  };

  return (
    <label className="checkbox">
      <input
        {...args}
        type="checkbox"
        checked={isChecked}
        value={isChecked}
        onChange={handleChange}
      />
      <span
        className={
          'material-symbols-outlined checkbox__icon' +
          (isChecked ? '--checked' : '')
        }
      >
        check_circle
      </span>
      {children}
    </label>
  );
}
