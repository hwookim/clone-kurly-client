import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './Category.scss';
import api from '../../apis';

export default function Category() {
  const [categories, setCategories] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(-1);
  const isHovered = useMemo(() => hoveredCategory !== -1, [hoveredCategory]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    api.categories.getAll().then((data) => setCategories(data));
  }, []);

  const onMouseEnterCategory = (id) => () => {
    setHoveredCategory(id);
  };

  const onMouseLeaveCategory = () => {
    setHoveredCategory(-1);
  };

  const renderSubCategories = useCallback(() => {
    const subCategories = categories[hoveredCategory].sub_categories;
    if (!subCategories) {
      return;
    }

    const height = dropdownRef.current.clientHeight;
    return (
      <div className="category__sub-dropdown" style={{ height }}>
        {subCategories.map(({ id, name }) => (
          <div key={name + id} className="category__sub-dropdown__item" data-id={id}>
            {name}
          </div>
        ))}
      </div>
    );
  }, [categories, hoveredCategory]);

  return (
    <div className="category" onMouseLeave={onMouseLeaveCategory}>
      <span className="category__icon material-symbols-outlined">menu</span>
      <span className="category__text">카테고리</span>
      <div className="category__dropdown" ref={dropdownRef}>
        {categories?.map(({ id, name }) => (
          <div
            key={name + id}
            className={'category__dropdown__item ' + (hoveredCategory === id && 'active')}
            onMouseEnter={onMouseEnterCategory(id)}
          >
            {name}
          </div>
        ))}
      </div>
      {isHovered && renderSubCategories()}
    </div>
  );
}
