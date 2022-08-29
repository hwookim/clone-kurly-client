import React, { useMemo } from 'react';
import './index.scss';

export default function Button({ variant = 'default', ...args }) {
  const className = useMemo(() => (variant === 'primary' ? 'primary' : 'default'), [variant]);

  return <button className={"btn " + className} {...args} />;
}
