import React from 'react';

import './Dropdown.scss';

export default function Dropdown({ title, children }) {
  return (
    <div className="dropdown">
      {title}
      <div className="dropdown-contents">{children}</div>
    </div>
  );
}
