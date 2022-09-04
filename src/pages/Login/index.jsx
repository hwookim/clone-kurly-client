import React from 'react';
import './LoginPage.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="login">
      <div className="login__title">로그인</div>
      <form className="login__form">
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
