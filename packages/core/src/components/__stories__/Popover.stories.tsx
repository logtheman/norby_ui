import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { Text } from '../Text';

const meta: Meta<typeof Popover> = {
  title: 'Core/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end'
      ]
    }
  }
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover {...args}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ padding: '1rem' }}>
            <Text>This is popover content</Text>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}
    >
      <Popover placement="top">
        <PopoverTrigger>
          <Button>Top</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ padding: '1rem' }}>
            <Text>Top popover</Text>
          </div>
        </PopoverContent>
      </Popover>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Popover placement="left">
          <PopoverTrigger>
            <Button>Left</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ padding: '1rem' }}>
              <Text>Left popover</Text>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="right">
          <PopoverTrigger>
            <Button>Right</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ padding: '1rem' }}>
              <Text>Right popover</Text>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button>Bottom</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ padding: '1rem' }}>
            <Text>Bottom popover</Text>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
};
