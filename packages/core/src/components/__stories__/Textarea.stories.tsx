import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
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

type S = StoryObj<typeof Textarea>;

export const Basic: S = {
  args: { label: 'Message', placeholder: 'Enter your message...', minRows: 3 }
};

export const WithDescription: S = {
  args: {
    label: 'Comments',
    description: 'Please provide detailed feedback',
    minRows: 4
  }
};

export const WithError: S = {
  args: {
    label: 'Message',
    errorMessage: 'Message is required',
    isInvalid: true,
    minRows: 3
  }
};

export const Required: S = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    isRequired: true,
    minRows: 3
  }
};

export const Disabled: S = {
  args: {
    label: 'Message',
    isDisabled: true,
    defaultValue: 'This textarea is disabled',
    minRows: 3
  }
};

export const ReadOnly: S = {
  args: {
    label: 'Message',
    defaultValue: 'This textarea is read-only',
    isReadOnly: true,
    minRows: 3
  }
};

export const WithMinMaxRows: S = {
  args: {
    label: 'Message',
    placeholder: 'Type here...',
    minRows: 3,
    maxRows: 8
  }
};

export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Textarea label="Bordered" variant="bordered" placeholder="Bordered textarea" minRows={3} />
      <Textarea label="Flat" variant="flat" placeholder="Flat textarea" minRows={3} />
      <Textarea label="Faded" variant="faded" placeholder="Faded textarea" minRows={3} />
      <Textarea label="Underlined" variant="underlined" placeholder="Underlined textarea" minRows={3} />
    </div>
  )
};

export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Textarea label="Default" color="default" placeholder="Default textarea" minRows={3} />
      <Textarea label="Primary" color="primary" placeholder="Primary textarea" minRows={3} />
      <Textarea label="Secondary" color="secondary" placeholder="Secondary textarea" minRows={3} />
      <Textarea label="Success" color="success" placeholder="Success textarea" minRows={3} />
      <Textarea label="Warning" color="warning" placeholder="Warning textarea" minRows={3} />
      <Textarea label="Danger" color="danger" placeholder="Danger textarea" minRows={3} />
    </div>
  )
};

export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Textarea label="Small" size="sm" placeholder="Small textarea" minRows={3} />
      <Textarea label="Medium" size="md" placeholder="Medium textarea" minRows={3} />
      <Textarea label="Large" size="lg" placeholder="Large textarea" minRows={3} />
    </div>
  )
};
