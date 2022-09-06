import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

import apis from '../../apis';

import './LoginPage.scss';

export default function LoginPage() {
  const [values, setValues] = useState({
    id: '',
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
      .then(() => navigate('/'))
      .catch((err) => alert(err));
  };

  return (
    <div className="login">
      <div className="login__title">로그인</div>
      <form className="login__form" onChange={handleChangeInputs} onSubmit={handleSubmitForm}>
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
