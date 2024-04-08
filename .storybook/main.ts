import type {StorybookConfig} from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y', //👈 The a11y addon goes here
  ],
};
export default config;
