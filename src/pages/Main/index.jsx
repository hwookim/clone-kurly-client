import React, { useEffect, useMemo, useState } from 'react';
import './MainPage.scss';
import Banner from './Banner';
import ProductListItem from '../../components/ProductListItem';

import api from '../../apis';
import useCarousel from '../../hooks/useCarousel';

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
      <Banner />
      <section className="main-contents">
        <div className="main-contents__title">이 상품 어때요?</div>
        <div className="main-contents__carousel">
          <div className="main-contents__carousel__content">
            <div className="main-contents__carousel__content__product-list" ref={carouselRef}>
              {products.map((product) => (
                <div key={product.id} className="main-contents__carousel__content__product-list__item">
                  <ProductListItem product={product} />
                </div>
              ))}
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
