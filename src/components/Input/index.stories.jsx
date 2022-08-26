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
