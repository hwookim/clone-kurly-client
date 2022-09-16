import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import apis from '../../apis';

export default function KakaoLoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    apis.users.kakaoLogin(code).then(() => {
      navigate('/');
    });
  }, [code, navigate]);

  return <div>카카오 로그인 중</div>;
}
