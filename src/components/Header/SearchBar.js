import React, { useMemo } from 'react';

import './SearchBar.scss';

export default function SearchBar({ isSticky }) {
  const className = useMemo(
    () => 'search-bar' + (isSticky ? '--sticky' : ''),
    [isSticky]
  );

  return (
    <div className={'search-bar ' + className}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      <button type="button">
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}
