import React from 'react';

import Button from './index';
import { COLORS } from '../../constants';

export default {
  title: 'common/Button',
  component: Button,
};

const Template = (args) => (
  <div style={{ width: '120px', height: '44px' }}>
    <Button {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: '내용',
};

export const Primary = Template.bind({});
Primary.args = {
  variant: COLORS.PRIMARY,
  children: '내용',
};