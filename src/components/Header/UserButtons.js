import React from 'react';
import { Link } from 'react-router-dom';

import './UserButtons.scss';

export default function UserButtons({ isSticky }) {
  return (
    <div className={'user-buttons ' + (isSticky ? 'sticky' : '')}>
      <button className="user-buttons-item" type="button">
        <span className="user-buttons-icon material-symbols-outlined">
          location_on
        </span>
      </button>
      <button className="user-buttons-item" type="button">
        <span className="user-buttons-icon material-symbols-outlined">
          favorite
        </span>
      </button>
      <Link to="/baskets">
        <button className="user-buttons-item" type="button">
          <span className="user-buttons-icon material-symbols-outlined">
            shopping_cart
          </span>
        </button>
      </Link>
    </div>
  );
}
