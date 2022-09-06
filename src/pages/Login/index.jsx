import React, { useState } from 'react';
import './LoginPage.scss';

import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

import api from '../../apis';
import auth from '../../utils/auth';

export default function LoginPage() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { id, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const isAnyEmpty = Object.values(values).some((value) => !value);
    if (isAnyEmpty) {
      return;
    }

    try {
      const { accessToken } = await api.post('/login', values);
      auth.set(accessToken);
      navigate('/');
    } catch (error) {
      // TODO: 로그인 실패 시 로직 추가
      alert(error);
    }
  };

  return (
    <div className="login">
      <div className="login__title">로그인</div>
      <form className="login__form" onChange={onChange} onSubmit={onSubmit}>
        <Input id="id" placeholder="아이디를 입력해주세요"></Input>
        <Input id="password" type="password" placeholder="비밀번호를 입력해주세요"></Input>
        <Button type="submit" variant="primary">
          로그인
        </Button>
        <Link to="/signup">
          <Button type="button">회원가입</Button>
        </Link>
      </form>
    </div>
  );
}
