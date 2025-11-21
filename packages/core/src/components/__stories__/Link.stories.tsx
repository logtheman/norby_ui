import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../Link';

const meta: Meta<typeof Link> = {
  title: 'Core/Link',
  component: Link
};
export default meta;

type S = StoryObj<typeof Link>;

export const Default: S = { args: { children: 'Link', href: '#' } };
export const Colors: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" color="foreground">Foreground</Link>
      <Link href="#" color="primary">Primary</Link>
      <Link href="#" color="secondary">Secondary</Link>
      <Link href="#" color="success">Success</Link>
      <Link href="#" color="warning">Warning</Link>
      <Link href="#" color="danger">Danger</Link>
    </div>
  )
};
export const Underline: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" underline="none">None</Link>
      <Link href="#" underline="hover">Hover</Link>
      <Link href="#" underline="always">Always</Link>
      <Link href="#" underline="focus">Focus</Link>
    </div>
  )
};
export const External: S = { args: { children: 'External Link', href: 'https://example.com', isExternal: true } };
export const WithIcon: S = { args: { children: 'Link with icon', href: '#', showAnchorIcon: true } };
export const Block: S = { args: { children: 'Block Link', href: '#', isBlock: true } };
export const Disabled: S = { args: { children: 'Disabled Link', href: '#', isDisabled: true } };


