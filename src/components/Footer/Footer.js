import React from 'react';

import KakaoMap from '../KakaoMap';

import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <KakaoMap />
      </div>
      <div className="footer-right">
        <h1 className="title">마켓컬리</h1>
        <div className="info">주소: 서울 강남구 테헤란로 427 미차빌딩</div>
      </div>
    </footer>
  );
}
