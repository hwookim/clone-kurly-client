import React from 'react';
import './Button.scss';

export default function Button({ className, variant = 'default', ...args }) {
  return <button className={className + ' btn ' + variant} {...args} />;
}
