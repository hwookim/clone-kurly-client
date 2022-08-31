import React from 'react';

import Banner from './index';

export default {
  title: 'common/Banner',
  component: Banner,
};

const Template = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {};
