import React from 'react';

import Header from './index';

export default {
  title: 'common/Header',
  component: Header,
};

const Template = (args) => (
  <div
    style={{
      height: '300vh',
      width: '100%',
    }}
  >
    <Header {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
