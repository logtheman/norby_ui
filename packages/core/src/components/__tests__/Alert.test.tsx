import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Alert } from '../Alert';

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByRole('alert')).toHaveTextContent('Alert message');
    });

    it('has role="alert"', () => {
      render(<Alert>Test</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Alert>Test</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('lui-alert');
      expect(alert).toHaveClass('lui-alert--flat');
      expect(alert).toHaveClass('lui-alert--default');
      expect(alert).toHaveClass('lui-alert--radius-lg');
    });

    it('applies custom className', () => {
      render(<Alert className="custom-class">Test</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'solid'] as const;
    
    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Alert variant={variant}>Test</Alert>);
        expect(screen.getByRole('alert')).toHaveClass(`lui-alert--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Alert color={color}>Test</Alert>);
        expect(screen.getByRole('alert')).toHaveClass(`lui-alert--${color}`);
      });
    });
  });

  describe('Content', () => {
    it('renders title', () => {
      render(<Alert title="Alert Title">Alert message</Alert>);
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    it('renders startContent', () => {
      render(<Alert startContent={<span>Icon</span>}>Test</Alert>);
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('renders endContent', () => {
      render(<Alert endContent={<span>Close</span>}>Test</Alert>);
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('renders both title and children', () => {
      render(<Alert title="Title">Description</Alert>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Radius', () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;
    
    radii.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        render(<Alert radius={radius}>Test</Alert>);
        expect(screen.getByRole('alert')).toHaveClass(`lui-alert--radius-${radius}`);
      });
    });
  });

  describe('Animation', () => {
    it('applies no-animation class when disableAnimation is true', () => {
      render(<Alert disableAnimation>Test</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('lui-alert--no-animation');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Alert ref={ref}>Test</Alert>);
      expect(ref).toHaveBeenCalled();
    });
  });
});

