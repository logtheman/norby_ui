import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../Select';

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select
};
export default meta;

type S = StoryObj<typeof Select>;

export const Default: S = {
  render: () => (
    <Select label="Choose an option" placeholder="Select...">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  )
};
export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select variant="bordered" label="Bordered" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
      <Select variant="flat" label="Flat" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
      <Select variant="faded" label="Faded" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
      <Select variant="underlined" label="Underlined" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select color="default" label="Default" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
      <Select color="primary" label="Primary" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
      <Select color="secondary" label="Secondary" placeholder="Select...">
        <option value="1">Option 1</option>
      </Select>
    </div>
  )
};
export const WithError: S = {
  render: () => (
    <Select label="Choose an option" isInvalid errorMessage="Please select an option">
      <option value="">Select...</option>
      <option value="1">Option 1</option>
    </Select>
  )
};


