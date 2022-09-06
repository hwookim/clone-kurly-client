import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useCarousel from '../../../hooks/useCarousel';

import api from '../../../apis';

import './Banner.scss';

export default function Banner() {
  const [promotions, setPromotions] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const { ref: bannerRef, current, moveCarousel } = useCarousel({ length: promotions.length, loop: true });

  useEffect(() => {
    api.promotions.getAll().then((data) => setPromotions(data));
  }, []);

  useEffect(() => {
    if (isHover) return;
    let timer = setInterval(() => {
      moveCarousel(+1);
    }, 4000);

    return () => clearInterval(timer);
  }, [current, isHover, moveCarousel]);

  const onClickLeftButton = () => {
    moveCarousel(-1);
  };

  const onClickRightButton = () => {
    moveCarousel(+1);
  };

  const onMouseEnterImage = () => {
    setIsHover(true);
  };

  const onMouseLeaveImage = () => {
    setIsHover(false);
  };

  return (
    <div className="banner">
      <div
        ref={bannerRef}
        className="banner__image-container"
        onMouseEnter={onMouseEnterImage}
        onMouseLeave={onMouseLeaveImage}
      >
        {promotions.map(({ id, image, link }) => (
          <Link key={id} to={link} className="banner__image-container__link">
            <img src={image} alt={`banner-${id}`} className="banner__image-container__link__image" />
          </Link>
        ))}
      </div>
      <button className="banner__btn banner__btn-left" onClick={onClickLeftButton}>
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="banner__btn banner__btn-right" onClick={onClickRightButton}>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <div className="banner__counter">
        {current + 1} / {promotions.length}
      </div>
    </div>
  );
}
