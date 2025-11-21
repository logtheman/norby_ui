import type { Meta, StoryObj } from '@storybook/react';
import { Progress, CircularProgress } from '../Progress';

const meta: Meta<typeof Progress> = {
  title: 'Core/Progress',
  component: Progress,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    label: 'Progress'
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Progress size="sm" value={30} label="Small" />
      <Progress size="md" value={50} label="Medium" />
      <Progress size="lg" value={70} label="Large" />
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Progress color="primary" value={30} label="Primary" />
      <Progress color="success" value={50} label="Success" />
      <Progress color="warning" value={70} label="Warning" />
      <Progress color="danger" value={90} label="Danger" />
    </div>
  )
};

export const WithValue: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Progress value={45} label="Progress" showValueLabel />
      <Progress value={75} label="Progress" showValueLabel />
    </div>
  )
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Progress isIndeterminate label="Loading..." />
    </div>
  )
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <CircularProgress value={25} size="sm" />
      <CircularProgress value={50} size="md" />
      <CircularProgress value={75} size="lg" />
    </div>
  )
};

export const CircularWithValue: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <CircularProgress value={45} showValueLabel />
      <CircularProgress value={75} showValueLabel label="Progress" />
    </div>
  )
};


