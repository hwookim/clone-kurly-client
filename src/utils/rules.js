const rules = {
  signup: {
    id: [
      {
        validate: (value = '') => {
          return value.match(/(?=.*\d)(?=.*[a-zA-Z]).{6,16}/);
        },
        message: '6자 이상 16자 이하의 영문과 숫자를 조합',
      },
    ],
    password: [
      {
        validate: (value = '') => {
          return value.length <= 0 || value.length >= 10;
        },
        message: '최소 10자 이상 입력',
      },
      {
        validate: (value = '') => {
          return value.match(/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/);
        },
        message: '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합',
      },
    ],
    passwordCheck: [
      {
        validate: (value = '') => {
          return !!value;
        },
        message: '비밀번호를 한번 더 입력해주세요',
      },
      {
        validate: (value = '', password = '') => {
          return value === password;
        },
        message: '동일한 비밀번호를 입력',
      },
    ],
    name: [
      {
        validate: (value = '') => {
          return !!value;
        },
        message: '이름을 입력해주세요.',
      },
    ],
  },
};

export default rules;
