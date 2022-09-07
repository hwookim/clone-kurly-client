import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useCarousel from '../../../hooks/useCarousel';
import apis from '../../../apis';

import './Banner.scss';

export default function Banner() {
  const [promotions, setPromotions] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const {
    ref: bannerRef,
    current,
    moveCarousel,
  } = useCarousel({
    length: promotions.length,
    infinite: true,
  });

  useEffect(() => {
    apis.promotions
      .getAll()
      .then((data) => setPromotions([data[data.length - 1], ...data, data[0]]));
  }, []);

  useEffect(() => {
    if (isHover) return;
    let timer = setInterval(() => {
      moveCarousel(+1);
    }, 4000);

    return () => clearInterval(timer);
  }, [current, isHover, moveCarousel]);

  const handleClickLeftButton = () => {
    moveCarousel(-1);
  };

  const handleClickRightButton = () => {
    moveCarousel(+1);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="banner">
      <div
        ref={bannerRef}
        className="banner__image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {promotions.map(({ id, img_src, link }, index) => (
          <Link key={index} to={link} className="banner__image-container__link">
            <img
              src={img_src}
              alt={`banner-${id}`}
              className="banner__image-container__link__image"
            />
          </Link>
        ))}
      </div>
      <button
        className="banner__btn banner__btn-left"
        onClick={handleClickLeftButton}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        className="banner__btn banner__btn-right"
        onClick={handleClickRightButton}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <div className="banner__counter">
        {current + 1} / {promotions.length - 2}
      </div>
    </div>
  );
}
