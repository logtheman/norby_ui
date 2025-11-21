import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '../Modal';
import { Button } from '../Button';
import { Text } from '../Text';

const meta: Meta<typeof Modal> = {
  title: 'Core/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full']
    },
    placement: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'auto']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Modal>;

const ModalExample = (args: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <Text weight="semibold">Modal Title</Text>
          </ModalHeader>
          <ModalBody>
            <Text>This is the modal content. You can put anything here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalExample
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
            <Button key={s} size="sm" onClick={() => { setSize(s); setIsOpen(true); }}>
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size={size}>
          <ModalContent>
            <ModalHeader>
              <Text weight="semibold">{size.toUpperCase()} Modal</Text>
            </ModalHeader>
            <ModalBody>
              <Text>This is a {size} sized modal.</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

