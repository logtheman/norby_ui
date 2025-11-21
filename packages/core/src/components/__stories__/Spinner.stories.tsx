import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Core/Spinner',
  component: Spinner,
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

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="danger" />
    </div>
  )
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Spinner label="Loading..." labelPlacement="bottom" />
      <Spinner label="Loading..." labelPlacement="right" />
    </div>
  )
};


