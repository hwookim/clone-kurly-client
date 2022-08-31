import React, { useEffect, useState } from 'react';
import './Banner.scss';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    api.get('/promotions').then((data) => setDataset(data));
  }, []);

  return (
    <div className="banner">
      <div className="banner__image-container">
        {dataset?.map(({ id, image, link }) => (
          <Link key={id} to={link} className="banner__image-container__link">
            <img src={image} alt={`banner-${id}`} className="banner__image-container__link__image" />
          </Link>
        ))}
      </div>
      <button className="banner__btn banner__btn-left">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="banner__btn banner__btn-right">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <div className="banner__counter">0 / 0</div>
    </div>
  );
}
