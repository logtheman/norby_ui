import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../Switch';

const meta: Meta<typeof Switch> = {
  title: 'Core/Switch',
  component: Switch
};
export default meta;

type S = StoryObj<typeof Switch>;

export const Default: S = { args: { children: 'Enable notifications' } };
export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch color="default" defaultChecked>Default</Switch>
      <Switch color="primary" defaultChecked>Primary</Switch>
      <Switch color="secondary" defaultChecked>Secondary</Switch>
      <Switch color="success" defaultChecked>Success</Switch>
      <Switch color="warning" defaultChecked>Warning</Switch>
      <Switch color="danger" defaultChecked>Danger</Switch>
    </div>
  )
};
export const Disabled: S = { args: { children: 'Disabled switch', isDisabled: true, defaultChecked: true } };


