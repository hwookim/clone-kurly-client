import React, { useMemo, useRef } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import useIsInViewport from '../../hooks/useIsInViewport';
import UserButtons from './UserButtons';
import SearchBar from './SearchBar';
import Category from './Category';
import Dropdown from './Dropdown';
import auth from '../../utils/auth';

export default function Header({ username }) {
  const headerMainRef = useRef();
  const isInViewport = useIsInViewport(headerMainRef);
  const additionalClassName = useMemo(() => (isInViewport ? '' : '--sticky'), [isInViewport]);
  const navigate = useNavigate();

  const onLogout = () => {
    auth.clear();
    navigate(0);
  };

  return (
    <div className="header">
      <div className="header__main" ref={headerMainRef}>
        <div className="header__main__user-info">
          {username ? (
            <Dropdown title={<Link to="/notice">{username} 님 ▼</Link>}>
              <Link to="/baskets">장바구니</Link>
              <span onClick={onLogout}>로그아웃</span>
            </Dropdown>
          ) : (
            <>
              <Link to="/signup" className="header__main__user-info__signup">
                회원가입
              </Link>
              <div className="header__main__user-info__separator" />
              <Link to="/login" className="header__main__user-info__login">
                로그인
              </Link>
            </>
          )}
          <div className="header__main__user-info__separator" />
          <Dropdown title={<Link to="/notice">고객센터 ▼</Link>}>
            <Link to="/notice">공지사항</Link>
            <Link to="/qna">자주하는 질문</Link>
            <Link to="/inquiry/list">1:1 문의</Link>
            <Link to="/inquiry/bulk-order">대량주문 문의</Link>
          </Dropdown>
          <div className="header__main__user-info__dropdown"></div>
        </div>
        <div className="header__main__left">
          <img className="header__main__left__logo" alt="로고" />
          <Link to="/" className="header__main__left__link">
            마켓컬리
          </Link>
        </div>
        <SearchBar isSticky={!isInViewport} />
        <UserButtons isSticky={!isInViewport} />
      </div>
      <div className={'header__bottom' + additionalClassName}>
        <nav className="header__bottom__nav">
          <Category />
          <ul>
            <li>신상품</li>
            <li>베스트</li>
            <li>알뜰쇼핑</li>
            <li>특가/혜택</li>
          </ul>
          {isInViewport && (
            <div className="header__bottom__nav__notice">
              <Link to="/">
                <span>샛별・낮</span> 배송안내
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
