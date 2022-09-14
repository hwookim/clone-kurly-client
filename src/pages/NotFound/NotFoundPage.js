import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="error-icon material-symbols-outlined">error</span>
      <h3 className="not-found-title">찾으시는 페이지가 없습니다.</h3>
      <p className="not-found-content">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <Link to="/" className="btn">
        홈으로
      </Link>
    </div>
  );
}
