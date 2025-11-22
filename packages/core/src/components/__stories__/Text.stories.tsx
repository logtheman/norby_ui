import type { Meta, StoryObj } from '@storybook/react';
import { Text, H1, H2, H3, H4, H5 } from '../Text';

const meta: Meta<typeof Text> = {
  title: 'Core/Text',
  component: Text
};
export default meta;

type S = StoryObj<typeof Text>;

export const Default: S = { args: { children: 'Default text' } };
export const Headings: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
    </div>
  )
};
export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="2xl">2XL</Text>
      <Text size="3xl">3XL</Text>
    </div>
  )
};
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text color="default">Default</Text>
      <Text color="primary">Primary</Text>
      <Text color="secondary">Secondary</Text>
      <Text color="success">Success</Text>
      <Text color="warning">Warning</Text>
      <Text color="danger">Danger</Text>
      <Text color="muted">Muted</Text>
      <Text color="subtle">Subtle</Text>
    </div>
  )
};
export const Weights: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  )
};
