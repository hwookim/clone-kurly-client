import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Input';

import apis from '../../apis';

import './LoginPage.scss';

export default function LoginPage() {
  const [values, setValues] = useState({
    login_id: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChangeInputs = (event) => {
    const { id, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const isAnyEmpty = Object.values(values).some((value) => !value);
    if (isAnyEmpty) {
      return;
    }

    apis.users
      .login(values)
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login">
      <div className="login__title">로그인</div>
      <form
        className="login__form"
        onChange={handleChangeInputs}
        onSubmit={handleSubmitForm}
      >
        <Input id="login_id" placeholder="아이디를 입력해주세요" />
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button type="submit" variant="primary">
          로그인
        </button>
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
      </form>
    </div>
  );
}
