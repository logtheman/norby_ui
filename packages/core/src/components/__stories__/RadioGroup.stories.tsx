import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '../RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/RadioGroup',
  component: RadioGroup
};
export default meta;

type S = StoryObj<typeof RadioGroup>;

export const Default: S = {
  render: () => (
    <RadioGroup label="Choose an option">
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup label="Primary" color="primary">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
      <RadioGroup label="Secondary" color="secondary">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
      <RadioGroup label="Success" color="success">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    </div>
  )
};
export const Horizontal: S = {
  render: () => (
    <RadioGroup label="Choose an option" orientation="horizontal">
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  )
};
export const WithDescription: S = {
  render: () => (
    <RadioGroup label="Choose an option" description="Select one option from the list">
      <Radio value="option1" description="This is option 1">
        Option 1
      </Radio>
      <Radio value="option2" description="This is option 2">
        Option 2
      </Radio>
      <Radio value="option3" description="This is option 3">
        Option 3
      </Radio>
    </RadioGroup>
  )
};
export const Invalid: S = {
  render: () => (
    <RadioGroup label="Choose an option" isInvalid errorMessage="Please select an option">
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
    </RadioGroup>
  )
};
