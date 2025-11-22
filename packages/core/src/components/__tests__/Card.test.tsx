import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Card>Test</Card>);
      const card = screen.getByText('Test').closest('.lui-card');
      expect(card).toHaveClass('lui-card');
      expect(card).toHaveClass('lui-card--flat');
      expect(card).toHaveClass('lui-card--radius-lg');
    });

    it('applies custom className', () => {
      render(<Card className="custom-class">Test</Card>);
      const card = screen.getByText('Test').closest('.lui-card');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'shadow'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Card variant={variant}>Test</Card>);
        const card = screen.getByText('Test').closest('.lui-card');
        expect(card).toHaveClass(`lui-card--${variant}`);
      });
    });
  });

  describe('Radius', () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;

    radii.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        render(<Card radius={radius}>Test</Card>);
        const card = screen.getByText('Test').closest('.lui-card');
        expect(card).toHaveClass(`lui-card--radius-${radius}`);
      });
    });
  });

  describe('States', () => {
    it('renders pressable state', () => {
      render(<Card isPressable>Pressable</Card>);
      const card = screen.getByText('Pressable').closest('.lui-card');
      expect(card).toHaveClass('lui-card--pressable');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('renders hoverable state', () => {
      render(<Card isHoverable>Hoverable</Card>);
      const card = screen.getByText('Hoverable').closest('.lui-card');
      expect(card).toHaveClass('lui-card--hoverable');
    });

    it('calls onClick when pressable', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Card isPressable onClick={handleClick}>
          Pressable
        </Card>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Animation', () => {
    it('applies no-animation class when disableAnimation is true', () => {
      render(<Card disableAnimation>Test</Card>);
      const card = screen.getByText('Test').closest('.lui-card');
      expect(card).toHaveClass('lui-card--no-animation');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Test</Card>);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    const header = screen.getByText('Header');
    expect(header).toHaveClass('lui-card__header');
  });
});

describe('CardBody', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardBody>Body</CardBody>
      </Card>
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    render(
      <Card>
        <CardBody>Body</CardBody>
      </Card>
    );
    const body = screen.getByText('Body');
    expect(body).toHaveClass('lui-card__body');
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    const footer = screen.getByText('Footer');
    expect(footer).toHaveClass('lui-card__footer');
  });
});
