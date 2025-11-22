import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'flat', 'faded', 'dot']
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

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="bordered">Bordered</Badge>
      <Badge variant="flat">Flat</Badge>
      <Badge variant="faded">Faded</Badge>
      <Badge variant="dot" />
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Badge color="default">Default</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
};

export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Badge content="5">Notifications</Badge>
      <Badge content="New">Status</Badge>
      <Badge content="99+">Messages</Badge>
    </div>
  )
};
