import React from 'react';
import { Link } from 'react-router-dom';

import './UserButtons.scss';

export default function UserButtons({ isSticky }) {
  const className = 'user-buttons' + (isSticky ? '--sticky' : '');

  return (
    <div className={className}>
      <button className="user-buttons__button" type="button">
        <span className="user-buttons__button__icon material-symbols-outlined">
          location_on
        </span>
      </button>
      <button className="user-buttons__button" type="button">
        <span className="user-buttons__button__icon material-symbols-outlined">
          favorite
        </span>
      </button>
      <Link to="/baskets">
        <button className="user-buttons__button" type="button">
          <span className="user-buttons__button__icon material-symbols-outlined">
            shopping_cart
          </span>
        </button>
      </Link>
    </div>
  );
}