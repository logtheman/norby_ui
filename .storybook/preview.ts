import type { Preview } from '@storybook/react';
import '../packages/core/src/styles/tokens.css';
import '../packages/core/src/styles/base.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
