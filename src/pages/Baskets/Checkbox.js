import React, { useEffect, useState } from 'react';

import './CheckBox.scss';

export default function Checkbox({
  children,
  checked,
  value,
  disabled,
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
    <label className={'checkbox ' + (disabled ? 'disabled' : '')}>
      <input
        {...args}
        className="checkbox-input"
        type="checkbox"
        checked={isChecked}
        value={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span
        className={
          'material-symbols-outlined checkbox-icon ' +
          (disabled ? 'disabled' : '') +
          (isChecked ? 'checked' : '')
        }
      >
        check_circle
      </span>
      {children}
    </label>
  );
}
