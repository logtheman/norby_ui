import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Badge } from '../Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>5</Badge>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders content prop', () => {
      render(<Badge content="New" />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('prefers content over children', () => {
      render(<Badge content="Content">Children</Badge>);
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.queryByText('Children')).not.toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('lui-badge');
      expect(badge).toHaveClass('lui-badge--solid');
      expect(badge).toHaveClass('lui-badge--default');
      expect(badge).toHaveClass('lui-badge--md');
      expect(badge).toHaveClass('lui-badge--radius-full');
    });
  });

  describe('Variants', () => {
    const variants = ['solid', 'bordered', 'flat', 'faded'] as const;
    
    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Badge variant={variant}>Test</Badge>);
        const badge = screen.getByText('Test');
        expect(badge).toHaveClass(`lui-badge--${variant}`);
      });
    });

    it('renders with dot variant', () => {
      render(<Badge variant="dot">Test</Badge>);
      const badge = document.querySelector('.lui-badge--dot');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('lui-badge--dot');
    });
  });

  describe('Dot Variant', () => {
    it('renders dot variant without content', () => {
      render(<Badge variant="dot" />);
      const badge = document.querySelector('.lui-badge--dot');
      expect(badge).toBeInTheDocument();
    });

    it('has aria-label when content is string in dot variant', () => {
      render(<Badge variant="dot" content="New items" />);
      const badge = document.querySelector('.lui-badge--dot');
      expect(badge).toHaveAttribute('aria-label', 'New items');
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Badge color={color}>Test</Badge>);
        expect(screen.getByText('Test')).toHaveClass(`lui-badge--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Badge size={size}>Test</Badge>);
        expect(screen.getByText('Test')).toHaveClass(`lui-badge--${size}`);
      });
    });
  });

  describe('Radius', () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;
    
    radii.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        render(<Badge radius={radius}>Test</Badge>);
        expect(screen.getByText('Test')).toHaveClass(`lui-badge--radius-${radius}`);
      });
    });
  });

  describe('States', () => {
    it('renders invisible state', () => {
      render(<Badge isInvisible>Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('lui-badge--invisible');
    });
  });

  describe('Animation', () => {
    it('applies no-animation class when disableAnimation is true', () => {
      render(<Badge disableAnimation>Test</Badge>);
      expect(screen.getByText('Test')).toHaveClass('lui-badge--no-animation');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Badge ref={ref}>Test</Badge>);
      expect(ref).toHaveBeenCalled();
    });
  });
});


