import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export default function Header({ warning = '', ...args }) {
  return (
    <header>
      <div className="header">
        <div className="header__user-info">
          <Link to="/signup" className="header__user-info__signup">
            회원가입
          </Link>
          <div className="header__user-info__separator" />
          <Link to="/login" className="header__user-info__login">
            로그인
          </Link>
          <div className="header__user-info__separator" />
          <div>
            <Link to="header__user-info__notice">고객센터 ▼</Link>
          </div>
        </div>
        <div className="header__main">
          <div className="header__main__left">
            <img className="header__main__left__logo" alt="로고" />
            <Link to="/" className="header__main__left__link">
              마켓컬리
            </Link>
          </div>
          <div className="header__main__search">
            <input type="text" placeholder="검색어를 입력해주세요" />
            <button type="button">O</button>
          </div>
          <div className="header__main__right">
            <button type="button">
              <span className="material-symbols-outlined">location_on</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
        <nav className="header__nav">
          <div className="header__nav__category">
            <span className="header__nav__category__icon material-symbols-outlined">menu</span>카테고리
          </div>
          <ul>
            <li>신상품</li>
            <li>베스트</li>
            <li>알뜰쇼핑</li>
            <li>특가/혜택</li>
          </ul>
          <div className="header__nav__notice">
            <Link to="/">
              <span>샛별・낮</span> 배송안내
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
