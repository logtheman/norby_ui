import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Tooltip {...args} content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  )
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Tooltip content="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ padding: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Tooltip content="Default tooltip" color="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Primary tooltip" color="primary">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip content="Success tooltip" color="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip content="Warning tooltip" color="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip content="Danger tooltip" color="danger">
        <Button>Danger</Button>
      </Tooltip>
    </div>
  )
};


