import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import Header from '../../components/Header';
import Banner from './Banner';
import MainProductList from './MainProductList';

import api from '../../utils/api';
import useCarousel from '../../hooks/useCarousel';
import { useMemo } from 'react';

export default function MainPage() {
  const [products, setProducts] = useState([]);
  const carouselLength = useMemo(() => products.length / 4, [products]);
  const { ref: carouselRef, current, moveCarousel } = useCarousel({ length: carouselLength });

  useEffect(() => {
    api.get('/products').then((data) => setProducts(data));
  }, []);

  const onClickLeftButton = () => {
    moveCarousel(-1);
  };

  const onClickRightButton = () => {
    moveCarousel(+1);
  };

  return (
    <>
      <Header />
      <Banner />
      <section className="main-contents">
        <div className="main-contents__title">이 상품 어때요?</div>
        <div className="main-contents__carousel">
          <div className="main-contents__carousel__content">
            <div className="main-contents__carousel__content__product-list" ref={carouselRef}>
              <MainProductList products={products} />
            </div>
          </div>
          {current === 0 || (
            <button
              className="main-contents__carousel__btn main-contents__carousel__btn-left"
              onClick={onClickLeftButton}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
          )}
          {current === carouselLength - 1 || (
            <button
              className="main-contents__carousel__btn main-contents__carousel__btn-right"
              onClick={onClickRightButton}
            >
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>
          )}
        </div>
      </section>
    </>
  );
}
