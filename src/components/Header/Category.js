import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import apis from '../../apis';
import useQuery from '../../hooks/useQuery';

import './Category.scss';

export default function Category() {
  const categories = useQuery('category', () => apis.categories.getAll());
  const [hoveredCategory, setHoveredCategory] = useState(-1);
  const isHovered = useMemo(() => hoveredCategory !== -1, [hoveredCategory]);
  const dropdownRef = useRef(null);

  const renderSubCategories = useCallback(() => {
    const subCategories = categories.find(
      (category) => category.id === hoveredCategory
    )?.sub_categories;
    if (!subCategories) {
      return;
    }

    const height = dropdownRef.current.clientHeight;
    return (
      <div className="category__sub-dropdown" style={{ height }}>
        {subCategories.map(({ id, name }) => (
          <Link
            key={id}
            to={`/products?category=${id}`}
            className="category__sub-dropdown__item"
          >
            {name}
          </Link>
        ))}
      </div>
    );
  }, [categories, hoveredCategory]);

  const handleMouseEnter = (id) => () => {
    setHoveredCategory(id);
  };
  const handleMouseLeave = () => {
    setHoveredCategory(-1);
  };

  return (
    <div className="category" onMouseLeave={handleMouseLeave}>
      <span className="category__icon material-symbols-outlined">menu</span>
      <span className="category__text">카테고리</span>
      <div className="category__dropdown" ref={dropdownRef}>
        {categories?.map(({ id, name }) => (
          <Link
            key={id}
            to={`/products?category=${id}`}
            className={
              'category__dropdown__item ' + (hoveredCategory === id && 'active')
            }
            onMouseEnter={handleMouseEnter(id)}
          >
            {name}
          </Link>
        ))}
      </div>
      {isHovered && renderSubCategories()}
    </div>
  );
}
