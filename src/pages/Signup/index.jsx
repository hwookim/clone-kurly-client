import React from 'react';
import './SignupPage.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function SignupPage() {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup">
      <div className="signup__title">회원가입</div>
      <div className="signup__content">
        <div className="signup__content__header">
          <span className="point">* </span>
          필수입력사항
        </div>
        <form className="signup__content__form" onSubmit={onSubmit}>
          <div className="signup__content__form__input">
            <label htmlFor="id">
              아이디<span className="point">*</span>
            </label>
            <Input id="id" placeholder="아이디를 입력해주세요" />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="password">
              비밀번호<span className="point">*</span>
            </label>
            <Input id="password" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="password-check">
              비밀번호 확인<span className="point">*</span>
            </label>
            <Input id="password-check" placeholder="비밀번호를 한번 더 입력해주세요" />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="name">
              이름<span className="point">*</span>
            </label>
            <Input id="name" placeholder="이름을 입력해주세요" />
          </div>
          <Button type="submit" variant="primary">
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
