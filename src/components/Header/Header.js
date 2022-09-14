import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserButtons from './UserButtons';
import SearchBar from './SearchBar';
import Category from './Category';
import Dropdown from './Dropdown';

import useIsInViewport from '../../hooks/useIsInViewport';
import auth from '../../utils/auth';

import './Header.scss';

export default function Header({ username }) {
  const headerMainRef = useRef();
  const isInViewport = useIsInViewport(headerMainRef);
  const navigate = useNavigate();

  const handleClickLogout = () => {
    auth.clear();
    navigate(0);
  };

  return (
    <div className="header">
      <div className="header-main" ref={headerMainRef}>
        <div className="user-info">
          {username ? (
            <Dropdown title={<Link to="/notice">{username} 님 ▼</Link>}>
              <Link to="/baskets">장바구니</Link>
              <span onClick={handleClickLogout}>로그아웃</span>
            </Dropdown>
          ) : (
            <>
              <Link to="/signup" className="signup">
                회원가입
              </Link>
              <div className="separator" />
              <Link to="/login">로그인</Link>
            </>
          )}
          <div className="separator" />
          <Dropdown title={<Link to="/notice">고객센터 ▼</Link>}>
            <Link to="/notice">공지사항</Link>
            <Link to="/qna">자주하는 질문</Link>
            <Link to="/inquiry/list">1:1 문의</Link>
            <Link to="/inquiry/bulk-order">대량주문 문의</Link>
          </Dropdown>
          <div className="dropdown"></div>
        </div>
        <div className="logo">
          <img className="logo-img" alt="로고" />
          <Link to="/" className="title">
            마켓컬리
          </Link>
        </div>
        <SearchBar isSticky={!isInViewport} />
        <UserButtons isSticky={!isInViewport} />
      </div>
      <div className={'header-bottom ' + (isInViewport ? '' : 'sticky')}>
        <nav className="header-nav">
          <Category />
          <ul className="nav-list">
            <li className="nav-list-item">신상품</li>
            <li className="nav-list-item">베스트</li>
            <li className="nav-list-item">알뜰쇼핑</li>
            <li className="nav-list-item">특가/혜택</li>
          </ul>
          {isInViewport && (
            <div className="notice">
              <Link to="/">
                <span className="emphasis">샛별・낮</span> 배송안내
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
