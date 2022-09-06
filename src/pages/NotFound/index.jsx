import React from 'react';

import './NotFoundPage.scss';

import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="not-found__icon material-symbols-outlined">error</span>
      <h3 className="not-found__title">찾으시는 페이지가 없습니다.</h3>
      <p className="not-found__content">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <Link to="/" className="not-found__btn">
        <Button variant="primary">홈으로</Button>
      </Link>
    </div>
  );
}
