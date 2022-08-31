import React, { useEffect, useState } from 'react';
import './Category.scss';
import api from '../../utils/api';

export default function Category() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    api.get('/categories').then((data) => setCategories(data));
  }, []);

  return (
    <div className="category">
      <span className="category__icon material-symbols-outlined">menu</span>
      <span className="category__text">카테고리</span>
      <div className="category__dropdown">
        {categories?.map(({ id, name }) => (
          <div key={name + id} className="category__dropdown__item">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
