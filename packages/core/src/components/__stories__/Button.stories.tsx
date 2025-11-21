import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    },
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

type S = StoryObj<typeof Button>;

export const Default: S = { args: { children: 'Button', variant: 'solid', color: 'default' } };
export const Disabled: S = { args: { children: 'Disabled', isDisabled: true } };
export const Loading: S = { args: { children: 'Loading', isLoading: true } };
export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="bordered">Bordered</Button>
      <Button variant="light">Light</Button>
      <Button variant="flat">Flat</Button>
      <Button variant="faded">Faded</Button>
      <Button variant="shadow">Shadow</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
  )
};
export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};
export const Radius: S = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </div>
  )
};
export const WithIcons: S = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button startContent="→">Start Icon</Button>
      <Button endContent="→">End Icon</Button>
      <Button startContent="←" endContent="→">Both Icons</Button>
    </div>
  )
};
export const IconOnly: S = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button isIconOnly>+</Button>
      <Button isIconOnly color="primary">+</Button>
      <Button isIconOnly color="danger">×</Button>
    </div>
  )
};
export const FullWidth: S = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  )
};
