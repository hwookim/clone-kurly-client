import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Banner.scss';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [dataset, setDataset] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    api.get('/promotions').then((data) => setDataset(data));
  }, []);

  useEffect(() => {
    if (!bannerRef?.current) return;

    bannerRef.current.style.transition = 'all 0.5s ease-in-out';
    bannerRef.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  const moveCarousel = useCallback(
    (direction) => {
      const value = current + direction;
      if (value < 0) {
        setCurrent(dataset.length - 1);
        return;
      }
      if (value >= dataset.length) {
        setCurrent(0);
        return;
      }
      setCurrent(value);
    },
    [current, dataset.length]
  );

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
