import React, { useMemo } from 'react';

import RecentProducts from '../../components/RecentProducts';
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
    onSuccess: ({ data }) => setProducts(data),
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
      <section className="main-content">
        <div className="list-title">이 상품 어때요?</div>
        <div className="products-carousel">
          <div className="carousel-content">
            <div className="carousel-list" ref={carouselRef}>
              {products.map((product) => (
                <div key={product.id} className="carousel-list-item">
                  <ProductListItem product={product} />
                </div>
              ))}
            </div>
          </div>
          {current === 0 || (
            <button
              className="carousel-btn carousel-btn-left"
              onClick={handleClickLeftButton}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
          )}
          {current === carouselLength - 1 || (
            <button
              className="carousel-btn carousel-btn-right"
              onClick={handleClickRightButton}
            >
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </button>
          )}
        </div>
      </section>
      <RecentProducts startTop="544" />
    </>
  );
}
