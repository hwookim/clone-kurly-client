import React, { useCallback, useEffect, useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import rules from '../../utils/rules';
import apis from '../../apis';

import './SignupPage.scss';

export default function SignupPage() {
  const [values, setValues] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
  });
  const [messages, setMessages] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
  });
  const [isNotValid, setIsNotValid] = useState(true);

  const validateRule = useCallback(
    (id, value) => {
      let flag = false;
      rules.signup[id].forEach((rule) => {
        if (flag) return;
        if (rule.validate(value, values.password)) {
          setMessages((prev) => ({
            ...prev,
            [id]: '',
          }));
          return;
        }

        flag = true;
        setMessages((prev) => ({
          ...prev,
          [id]: rule.message,
        }));
        setIsNotValid(true);
      });
    },
    [values.password]
  );

  useEffect(() => {
    if (values.passwordCheck) {
      validateRule('passwordCheck', values.passwordCheck);
    }
  }, [values.password, values.passwordCheck, validateRule]);

  const onChange = (event) => {
    const { id, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateRule(id, value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    Object.keys(values).forEach((key) => validateRule(key, values[key]));
    if (isNotValid) {
      return;
    }

    await apis.users.signup(values);
  };

  return (
    <div className="signup">
      <div className="signup__title">회원가입</div>
      <div className="signup__content">
        <div className="signup__content__header">
          <span className="point">* </span>
          필수입력사항
        </div>
        <form className="signup__content__form" onChange={onChange} onSubmit={handleSubmitForm}>
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
