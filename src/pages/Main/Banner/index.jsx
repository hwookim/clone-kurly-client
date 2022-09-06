import React, { useEffect, useState } from 'react';
import './Banner.scss';
import api from '../../../apis';
import { Link } from 'react-router-dom';
import useCarousel from '../../../hooks/useCarousel';

export default function Banner() {
  const [dataset, setDataset] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const { ref: bannerRef, current, moveCarousel } = useCarousel({ length: dataset.length, loop: true });

  useEffect(() => {
    api.get('/promotions').then((data) => setDataset(data));
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
        {dataset.map(({ id, image, link }) => (
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
        {current + 1} / {dataset.length}
      </div>
    </div>
  );
}
