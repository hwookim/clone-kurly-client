import React from 'react';

import Banner from './index';
import { rest } from 'msw';
import PROMOTIONS from '../../../../__mock__/promotions.json';

export default {
  title: 'common/Banner',
  component: Banner,
};

const Template = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  msw: {
    handlers: [
      rest.get('/promotions', (req, res, ctx) => {
        return res(ctx.json(PROMOTIONS));
      }),
    ],
  },
};
