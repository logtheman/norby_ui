import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../Alert';
import { Text } from '../Text';

const meta: Meta<typeof Alert> = {
  title: 'Core/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'solid']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Alert Title',
    children: 'This is an alert message.'
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="flat" title="Flat Alert">
        This is a flat alert
      </Alert>
      <Alert variant="bordered" title="Bordered Alert">
        This is a bordered alert
      </Alert>
      <Alert variant="solid" title="Solid Alert">
        This is a solid alert
      </Alert>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert color="primary" title="Primary Alert">
        This is a primary alert
      </Alert>
      <Alert color="success" title="Success Alert">
        This is a success alert
      </Alert>
      <Alert color="warning" title="Warning Alert">
        This is a warning alert
      </Alert>
      <Alert color="danger" title="Danger Alert">
        This is a danger alert
      </Alert>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert
        color="success"
        title="Success"
        startContent="✓"
      >
        Your changes have been saved successfully.
      </Alert>
      <Alert
        color="danger"
        title="Error"
        startContent="✕"
      >
        Something went wrong. Please try again.
      </Alert>
    </div>
  )
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert color="info">
      This alert doesn't have a title, just a message.
    </Alert>
  )
};


