import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '../Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { children: 'Checkbox' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox color="primary">Primary</Checkbox>
      <Checkbox color="secondary">Secondary</Checkbox>
      <Checkbox color="success">Success</Checkbox>
      <Checkbox color="warning">Warning</Checkbox>
      <Checkbox color="danger">Danger</Checkbox>
    </div>
  )
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox isIndeterminate>
      Indeterminate checkbox
    </Checkbox>
  )
};

export const WithDescription: Story = {
  render: () => (
    <Checkbox description="This is a description">
      Checkbox with description
    </Checkbox>
  )
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Select your preferences">
      <Checkbox value="email">Email notifications</Checkbox>
      <Checkbox value="sms">SMS notifications</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
    </CheckboxGroup>
  )
};

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup label="Select options" orientation="horizontal">
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
};


