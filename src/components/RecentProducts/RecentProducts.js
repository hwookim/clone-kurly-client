import React from 'react';
import { Link } from 'react-router-dom';

import localstorage from '../../utils/localstorage';

import './RecentProducts.scss';

export default function RecentProducts() {
  const products = localstorage.getRecentProducts();

  if (products.length === 0) return <></>;

  return (
    <nav className="recent-products">
      <span className="icon material-symbols-outlined">keyboard_arrow_up</span>
      <p className="recent-text">최근 본 상품</p>
      <div className="recent-list-wrapper">
        <ul className="recent-list">
          {products.map(({ id, thumbnail }) => (
            <li key={id}>
              <Link to={`/products/${id}`} className="recent-list-item">
                <img
                  src={thumbnail}
                  alt={`/products/${id}`}
                  className="recent-list-thumbnail"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <span className="icon material-symbols-outlined">
        keyboard_arrow_down
      </span>
    </nav>
  );
}
