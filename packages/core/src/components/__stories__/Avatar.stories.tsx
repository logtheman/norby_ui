import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe'
  }
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    name: 'John Doe'
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="JD" radius="none" />
      <Avatar name="JD" radius="sm" />
      <Avatar name="JD" radius="md" />
      <Avatar name="JD" radius="lg" />
      <Avatar name="JD" radius="full" />
    </div>
  )
};

export const Bordered: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="John Doe" isBordered />
      <Avatar src="https://i.pravatar.cc/150?img=1" isBordered />
    </div>
  )
};
