import React  from 'react';
import './Button.scss';

export default function Button({ variant = 'default', ...args }) {
  return <button className={"btn " + variant} {...args} />;
}
