import React from 'react';

import Input from './index';

export default {
  title: 'common/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '아이디를 입력해주세요'
}

export const Password = Template.bind({});
Password.args = {
  placeholder: '비밀번호를 입력해주세요',
  type: 'password',
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  placeholder: '아이디를 입력해주세요',
  warning: '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합'
}