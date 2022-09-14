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
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
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
    <div className="login-page">
      <div className="login-title">로그인</div>
      <form
        className="login-form"
        onChange={handleChangeInputs}
        onSubmit={handleSubmitForm}
      >
        <Input
          className="login-input"
          name="login_id"
          placeholder="아이디를 입력해주세요"
        />
        <Input
          className="login-input"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button className="login-btn" type="submit" variant="primary">
          로그인
        </button>
        <Link to="/signup" className="login-btn">
          회원가입
        </Link>
      </form>
    </div>
  );
}
