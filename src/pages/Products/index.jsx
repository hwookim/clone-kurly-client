import React, { useState, useEffect } from 'react';
import './ProductsPage.scss';
import { useSearchParams } from 'react-router-dom';
import api from '../../utils/api';
import ProductListItem from '../../components/ProductListItem';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('카테고리');

  useEffect(() => {
    api.get(`/products?${searchParams.toString()}`).then((data) => setProducts(data));
  }, [searchParams]);
  useEffect(() => {
    api.get(`/categories/${searchParams.get('category')}`).then((data) => setCategory(data));
  });

  return (
    <div className="products">
      <h3 className="products__title">{category.name}</h3>
      <div className="products__list">
        {products.map((product) => (
          <div className="products__list__item">
            <ProductListItem key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
