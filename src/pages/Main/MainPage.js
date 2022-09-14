import React, { useMemo } from 'react';

import ProductListItem from '../../components/ProductListItem';
import Banner from './Banner';

import useCarousel from '../../hooks/useCarousel';
import useQuery from '../../hooks/useQuery';
import apis from '../../apis';

import './MainPage.scss';

export default function MainPage() {
  const {
    data: products,
    setData: setProducts,
    ref: carouselRef,
    current,
    moveCarousel,
  } = useCarousel();
  const carouselLength = useMemo(
    () => parseInt(products.length / 4),
    [products]
  );

  useQuery('products', () => apis.products.getAll(), {
    onSuccess: setProducts,
  });

  const handleClickLeftButton = () => {
    moveCarousel(-1);
  };

  const handleClickRightButton = () => {
    moveCarousel(+1);
  };

  return (
    <>
      <Banner />
      <section className="main-contents">
        <div className="main-contents__title">이 상품 어때요?</div>
        <div className="main-contents__carousel">
          <div className="main-contents__carousel__content">
            <div
              className="main-contents__carousel__content__product-list"
              ref={carouselRef}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="main-contents__carousel__content__product-list__item"
                >
                  <ProductListItem product={product} />
                </div>
              ))}
            </div>
          </div>
          {current === 0 || (
            <button
              className="main-contents__carousel__btn main-contents__carousel__btn-left"
              onClick={handleClickLeftButton}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
          )}
          {current === carouselLength - 1 || (
            <button
              className="main-contents__carousel__btn main-contents__carousel__btn-right"
              onClick={handleClickRightButton}
            >
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </button>
          )}
        </div>
      </section>
    </>
  );
}