import React from 'react';

import Header from './index';
import { rest } from 'msw';

import CATEGORIES from '../../../__mock__/categories.json';

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
Default.parameters = {
  msw: {
    handlers: [
      rest.get('/categories', (req, res, ctx) => {
        return res(ctx.json(CATEGORIES));
      }),
    ],
  },
};
