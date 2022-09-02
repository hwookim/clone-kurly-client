import React, { useState } from 'react';
import './SignupPage.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';
import rules from '../../utils/rules';

export default function SignupPage() {
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  const onChange = (event) => {
    const { id, value } = event.target;

    if (id === 'password') {
      setPassword(value);
    }

    rules.signup[id].forEach((rule) => {
      if (rule.validate(value, password)) {
        setMessages((prev) => ({
          ...prev,
          [id]: '',
        }));
        return;
      }
      setMessages((prev) => ({
        ...prev,
        [id]: rule.message,
      }));
    });
  };

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
        <form className="signup__content__form" onChange={onChange} onSubmit={onSubmit}>
          <div className="signup__content__form__input">
            <label htmlFor="id">
              아이디<span className="point">*</span>
            </label>
            <Input id="id" type="text" placeholder="아이디를 입력해주세요" warning={messages.id} />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="password">
              비밀번호<span className="point">*</span>
            </label>
            <Input id="password" type="password" placeholder="비밀번호를 입력해주세요" warning={messages.password} />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="passwordCheck">
              비밀번호 확인<span className="point">*</span>
            </label>
            <Input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              warning={messages.passwordCheck}
            />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="name">
              이름<span className="point">*</span>
            </label>
            <Input id="name" type="text" placeholder="이름을 입력해주세요" warning={messages.name} />
          </div>
          <Button type="submit" variant="primary">
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
