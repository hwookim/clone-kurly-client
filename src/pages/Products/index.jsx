import React, { useState, useEffect } from 'react';
import './ProductsPage.scss';
import { useSearchParams } from 'react-router-dom';
import api from '../../utils/api';
import ProductListItem from '../../components/ProductListItem';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/products?${searchParams.toString()}`).then((data) => setProducts(data));
  }, [searchParams]);
  return (
    <div className="products">
      {products.map((product) => (
        <div className="products__item">
          <ProductListItem key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
}
