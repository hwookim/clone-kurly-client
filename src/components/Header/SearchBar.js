import React from 'react';

import './SearchBar.scss';

export default function SearchBar({ isSticky }) {
  return (
    <label className={'search-bar ' + (isSticky ? 'sticky' : '')}>
      <input
        className="search-input"
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      <button type="button" className="search-btn">
        <span className="search-icon material-symbols-outlined">search</span>
      </button>
    </label>
  );
}
