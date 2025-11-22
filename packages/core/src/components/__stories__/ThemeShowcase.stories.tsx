import type { Meta, StoryObj } from '@storybook/react';
import { ThemeShowcase } from '../ThemeShowcase';

const meta: Meta<typeof ThemeShowcase> = {
  title: 'Showcase/Theme Showcase',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive showcase of all component variations, colors, sizes, and themes. Similar to HeroUI theme showcase.'
      }
    }
  },
  argTypes: {
    component: {
      control: 'select',
      options: ['', 'Button', 'TextField', 'Select', 'Switch', 'Link'],
      description: 'Filter to show only a specific component'
    },
    variant: {
      control: 'text',
      description: 'Filter by variant'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

export const AllComponents: Story = {
  args: {}
};

export const ButtonsOnly: Story = {
  args: {
    component: 'Button'
  }
};

export const InputsOnly: Story = {
  args: {
    component: 'TextField'
  }
};

export const PrimaryColor: Story = {
  args: {
    color: 'primary'
  }
};
