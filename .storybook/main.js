module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader',
          options: {
            additionalData: `
            @import "./src/styles/reset.scss";
            @import "./src/styles/global.scss";
		  `,
          },
        },
      ],
    });
    return config;
  },
};
