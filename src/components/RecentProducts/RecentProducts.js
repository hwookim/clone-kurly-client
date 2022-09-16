import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import localstorage from '../../utils/localstorage';

import './RecentProducts.scss';

export default function RecentProducts({ startTop }) {
  const products = localstorage.getRecentProducts();
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(startTop);
  const [pivot, setPiviot] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [listTop, setListTop] = useState(0);
  const isTop = listTop >= 0;
  const isBottom = listTop < (products.length - 3) * -80;

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewportY = containerRef.current.getBoundingClientRect().y;
    if (viewportY >= 150 && !isMoving) {
      setPiviot(scrollY);
      return;
    }
    setIsMoving(true);
    if (scrollY < pivot) {
      setIsMoving(false);
      setContainerTop(startTop);
      return;
    }

    const viewportCenterTop =
      scrollY + window.innerHeight * 0.5 - containerRef.current.clientHeight;
    setContainerTop(viewportCenterTop);
  }, [isMoving, pivot, scrollY, startTop]);

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
    <nav
      className="recent-products"
      style={{ top: `${containerTop}px` }}
      ref={containerRef}
    >
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
