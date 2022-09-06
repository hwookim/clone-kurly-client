import React, { useMemo } from 'react';
import './UserButtons.scss';
import { Link } from 'react-router-dom';

export default function UserButtons({ isSticky }) {
  const className = useMemo(() => 'user-buttons' + (isSticky ? '--sticky' : ''), [isSticky]);

  return (
    <div className={className}>
      <button className="user-buttons__button" type="button">
        <span className="user-buttons__button__icon material-symbols-outlined">location_on</span>
      </button>
      <button className="user-buttons__button" type="button">
        <span className="user-buttons__button__icon material-symbols-outlined">favorite</span>
      </button>
      <Link to="/baskets">
        <button className="user-buttons__button" type="button">
          <span className="user-buttons__button__icon material-symbols-outlined">shopping_cart</span>
        </button>
      </Link>
    </div>
  );
}
