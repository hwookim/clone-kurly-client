import React from 'react';
import './Banner.scss';

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner__image-container"></div>
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
