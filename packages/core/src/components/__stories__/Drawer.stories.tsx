import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '../Drawer';
import { Button } from '../Button';
import { Text } from '../Text';

const meta: Meta<typeof Drawer> = {
  title: 'Core/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerExample = (args: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <Text weight="semibold">Drawer Title</Text>
          </DrawerHeader>
          <DrawerBody>
            <Text>This is the drawer content. You can put anything here.</Text>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="flat" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: DrawerExample
};

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = React.useState<'top' | 'bottom' | 'left' | 'right'>('right');
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
            <Button
              key={p}
              size="sm"
              onClick={() => {
                setPlacement(p);
                setIsOpen(true);
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement={placement}>
          <DrawerContent>
            <DrawerHeader>
              <Text weight="semibold">
                {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <Text>This drawer opens from the {placement}.</Text>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
};
