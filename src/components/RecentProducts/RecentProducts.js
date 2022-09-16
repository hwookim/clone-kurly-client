import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import localstorage from '../../utils/localstorage';

import './RecentProducts.scss';

export default function RecentProducts() {
  const products = localstorage.getRecentProducts();
  const [listTop, setListTop] = useState(0);
  const isTop = listTop >= 0;
  const isBottom = listTop < (products.length - 3) * -80;

  const onClickUpBtn = () => {
    if (isTop) return;

    const target = listTop + 80;
    if (target > 0) {
      setListTop(0);
      return;
    }
    setListTop(target);
  };

  const onClickDownBtn = () => {
    if (isBottom) return;

    const target = listTop - 80;
    if (target <= (products.length - 2) * -80) {
      setListTop((prev) => prev - 44);
      return;
    }
    setListTop(target);
  };

  if (products.length === 0) return <></>;

  return (
    <nav className="recent-products">
      <span
        className={'icon material-symbols-outlined ' + (isTop ? '' : 'active')}
        onClick={onClickUpBtn}
      >
        keyboard_arrow_up
      </span>
      <p className="recent-text">최근 본 상품</p>
      <div className="recent-list-wrapper">
        <ul className="recent-list" style={{ top: `${listTop}px` }}>
          {products.map(({ id, thumbnail }) => (
            <li key={id} className="recent-list-item">
              <Link to={`/products/${id}`} className="recent-list-link">
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
      <span
        className={
          'icon material-symbols-outlined ' + (isBottom ? '' : 'active')
        }
        onClick={onClickDownBtn}
      >
        keyboard_arrow_down
      </span>
    </nav>
  );
}
