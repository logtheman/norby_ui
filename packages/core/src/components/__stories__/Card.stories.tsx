import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';
import { Button } from '../Button';
import { Text } from '../Text';

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'shadow']
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <Text>Card content goes here</Text>
      </CardBody>
    </Card>
  )
};

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <Text weight="semibold">Card Title</Text>
      </CardHeader>
      <CardBody>
        <Text>Card content goes here</Text>
      </CardBody>
    </Card>
  )
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <Text>Card content goes here</Text>
      </CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  )
};

export const Complete: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <Text weight="semibold">Card Title</Text>
      </CardHeader>
      <CardBody>
        <Text>Card content goes here. This is a complete card with header, body, and footer.</Text>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="flat">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  )
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="flat">
        <CardBody>
          <Text>Flat variant</Text>
        </CardBody>
      </Card>
      <Card variant="bordered">
        <CardBody>
          <Text>Bordered variant</Text>
        </CardBody>
      </Card>
      <Card variant="shadow">
        <CardBody>
          <Text>Shadow variant</Text>
        </CardBody>
      </Card>
    </div>
  )
};

export const Pressable: Story = {
  render: () => (
    <Card isPressable onClick={() => alert('Card clicked!')}>
      <CardBody>
        <Text>Click me!</Text>
      </CardBody>
    </Card>
  )
};

export const Hoverable: Story = {
  render: () => (
    <Card isHoverable>
      <CardBody>
        <Text>Hover over me!</Text>
      </CardBody>
    </Card>
  )
};
