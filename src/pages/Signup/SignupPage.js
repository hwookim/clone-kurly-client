import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';

import rules from '../../utils/rules';
import apis from '../../apis';

import './SignupPage.scss';

export default function SignupPage() {
  const [values, setValues] = useState({
    login_id: '',
    password: '',
    passwordCheck: '',
    name: '',
  });
  const [messages, setMessages] = useState({
    login_id: '',
    password: '',
    passwordCheck: '',
    name: '',
  });
  const navigate = useNavigate();

  const validateRule = useCallback(
    (key, value) => {
      for (const rule of rules.signup[key]) {
        if (rule.validate(value, values.password)) {
          continue;
        }
        return rule.message;
      }
      return '';
    },
    [values.password]
  );

  useEffect(() => {
    if (!values.passwordCheck) return;

    const message = validateRule('passwordCheck', values.passwordCheck);
    setMessages((prev) => ({
      ...prev,
      passwordCheck: message,
    }));
  }, [values.password, values.passwordCheck, validateRule]);

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const message = validateRule(name, value);
    setMessages((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    for (const key of Object.keys(values)) {
      const message = validateRule(key, values[key]);
      setMessages((prev) => ({
        ...prev,
        [key]: message,
      }));
      if (message) {
        document.getElementById(key).focus();
        return;
      }
    }

    await apis.users.signup(values);
    navigate('/');
  };

  return (
    <div className="signup">
      <div className="signup__title">회원가입</div>
      <div className="signup__content">
        <div className="signup__content__header">
          <span className="point">* </span>
          필수입력사항
        </div>
        <form
          className="signup__content__form"
          onChange={handleChangeInputs}
          onSubmit={handleSubmitForm}
        >
          <div className="signup__content__form__input">
            <label htmlFor="login_id">
              아이디<span className="point">*</span>
            </label>
            <Input
              name="login_id"
              type="text"
              placeholder="아이디를 입력해주세요"
              warning={messages.login_id}
            />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="password">
              비밀번호<span className="point">*</span>
            </label>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              warning={messages.password}
            />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="passwordCheck">
              비밀번호 확인<span className="point">*</span>
            </label>
            <Input
              name="passwordCheck"
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              warning={messages.passwordCheck}
            />
          </div>
          <div className="signup__content__form__input">
            <label htmlFor="name">
              이름<span className="point">*</span>
            </label>
            <Input
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              warning={messages.name}
            />
          </div>
          <button type="submit" variant="primary">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
