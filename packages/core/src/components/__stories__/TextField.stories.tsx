import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../TextField';

const meta: Meta<typeof TextField> = {
  title: 'Core/TextField',
  component: TextField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'faded', 'underlined']
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

type S = StoryObj<typeof TextField>;

export const Basic: S = { args: { label: 'Email', placeholder: 'you@example.com' } };
export const WithDescription: S = { args: { label: 'Username', description: '3–16 characters' } };
export const WithError: S = { args: { label: 'Password', errorMessage: 'Must be at least 8 chars', isInvalid: true } };
export const Required: S = { args: { label: 'Email', placeholder: 'you@example.com', isRequired: true } };
export const Disabled: S = { args: { label: 'Email', placeholder: 'you@example.com', isDisabled: true, defaultValue: 'disabled@example.com' } };
export const ReadOnly: S = { args: { label: 'Email', defaultValue: 'readonly@example.com', isReadOnly: true } };
export const Clearable: S = { args: { label: 'Search', placeholder: 'Type to search...', isClearable: true } };
export const WithStartContent: S = { args: { label: 'Email', placeholder: 'you@example.com', startContent: '@' } };
export const WithEndContent: S = { args: { label: 'Website', placeholder: 'example.com', endContent: '.com' } };
export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField label="Bordered" variant="bordered" placeholder="Bordered input" />
      <TextField label="Flat" variant="flat" placeholder="Flat input" />
      <TextField label="Faded" variant="faded" placeholder="Faded input" />
      <TextField label="Underlined" variant="underlined" placeholder="Underlined input" />
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField label="Default" color="default" placeholder="Default input" />
      <TextField label="Primary" color="primary" placeholder="Primary input" />
      <TextField label="Secondary" color="secondary" placeholder="Secondary input" />
      <TextField label="Success" color="success" placeholder="Success input" />
      <TextField label="Warning" color="warning" placeholder="Warning input" />
      <TextField label="Danger" color="danger" placeholder="Danger input" />
    </div>
  )
};
export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField label="Small" size="sm" placeholder="Small input" />
      <TextField label="Medium" size="md" placeholder="Medium input" />
      <TextField label="Large" size="lg" placeholder="Large input" />
    </div>
  )
};
