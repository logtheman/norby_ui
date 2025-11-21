import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../Divider';
import { Text } from '../Text';

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const Horizontal: Story = {
  render: () => (
    <div>
      <Text>Content above</Text>
      <Divider orientation="horizontal" />
      <Text>Content below</Text>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Divider color="default" />
      <Divider color="primary" />
      <Divider color="secondary" />
      <Divider color="success" />
      <Divider color="warning" />
      <Divider color="danger" />
    </div>
  )
};


