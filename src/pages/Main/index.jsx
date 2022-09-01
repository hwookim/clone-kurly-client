import React from 'react';
import './MainPage.scss';
import Header from '../../components/Header';
import Banner from './Banner';

export default function MainPage() {
  return (
    <>
      <Header />
      <Banner />
      <section className="main-contents">
        <div className="main-contents__title">이 상품 어때요?</div>
        <div className="main-contents__carousel">
          <div className="main-contents__carousel__product-list"></div>
          <button className="main-contents__carousel__btn main-contents__carousel__btn-left">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button className="main-contents__carousel__btn main-contents__carousel__btn-right">
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </section>
    </>
  );
}
