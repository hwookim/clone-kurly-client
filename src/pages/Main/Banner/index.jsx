import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useCarousel from '../../../hooks/useCarousel';
import useQuery from '../../../hooks/useQuery';
import apis from '../../../apis';

import './Banner.scss';
export default function Banner() {
  const {
    data: promotions,
    setData: setPromotions,
    ref: bannerRef,
    current,
    moveCarousel,
  } = useCarousel({ infinite: true });
  const [isHover, setIsHover] = useState(false);

  useQuery('promotinos', () => apis.promotions.getAll(), {
    onSuccess: setPromotions,
  });

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
        {promotions.map(({ id, img_src, link }) => (
          <Link key={id} to={link} className="banner__image-container__link">
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
