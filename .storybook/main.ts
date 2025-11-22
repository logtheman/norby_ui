import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    const root = path.resolve(__dirname, '..');
    return mergeConfig(config, {
      resolve: {
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@logan/ui': path.resolve(root, 'packages/core/src')
        }
      },
      server: {
        fs: {
          allow: [root]
        }
      }
    });
  }
};

export default config;
