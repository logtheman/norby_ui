import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Calendar,
  Trash,
  Edit,
  Plus,
  Location,
  AlarmClock,
  Download
} from '../icons';

const meta: Meta = {
  title: 'Core/Icons',
  parameters: {
    layout: 'padded'
  }
};
export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => {
    const icons = [
      { name: 'Home', component: Home },
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'ArrowRight', component: ArrowRight },
      { name: 'ArrowUp', component: ArrowUp },
      { name: 'ArrowDown', component: ArrowDown },
      { name: 'Calendar', component: Calendar },
      { name: 'Trash', component: Trash },
      { name: 'Edit', component: Edit },
      { name: 'Plus', component: Plus },
      { name: 'Location', component: Location },
      { name: 'AlarmClock', component: AlarmClock },
      { name: 'Download', component: Download }
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '2rem',
          padding: '2rem'
        }}
      >
        {icons.map(({ name, component: IconComponent }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--color-border)'
            }}
          >
            <IconComponent size="lg" color="primary" />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  }
};

export const Colors: Story = {
  render: () => {
    const colors: Array<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'foreground'> = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'foreground'
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2rem',
          alignItems: 'center'
        }}
      >
        {colors.map((color) => (
          <div
            key={color}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.5rem',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--color-border)'
            }}
          >
            <Home size="lg" color={color} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>{color}</span>
          </div>
        ))}
      </div>
    );
  }
};

export const Sizes: Story = {
  render: () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2rem',
          alignItems: 'center'
        }}
      >
        {sizes.map((size) => (
          <div
            key={size}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.5rem',
              backgroundColor: 'var(--color-surface-2)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--color-border)'
            }}
          >
            <Home size={size} color="primary" />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>{size.toUpperCase()}</span>
          </div>
        ))}
      </div>
    );
  }
};

export const InButtons: Story = {
  render: () => {
    const { Button } = require('../Button');
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '2rem'
        }}
      >
        <Button variant="solid" color="primary" startContent={<Home size="md" color="foreground" />}>
          Home
        </Button>
        <Button variant="solid" color="success" startContent={<Plus size="md" color="foreground" />}>
          Add
        </Button>
        <Button variant="solid" color="danger" startContent={<Trash size="md" color="foreground" />}>
          Delete
        </Button>
        <Button variant="solid" color="secondary" startContent={<Edit size="md" color="foreground" />}>
          Edit
        </Button>
        <Button variant="solid" color="primary" isIconOnly>
          <Download size="md" color="foreground" />
        </Button>
        <Button variant="solid" color="primary" isIconOnly>
          <Location size="md" color="foreground" />
        </Button>
      </div>
    );
  }
};
