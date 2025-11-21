import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders spinner element', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('has role="status" and aria-live="polite"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('applies default classes', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('lui-spinner');
      expect(spinner).toHaveClass('lui-spinner--md');
      expect(spinner).toHaveClass('lui-spinner--primary');
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Spinner size={size} />);
        expect(screen.getByRole('status')).toHaveClass(`lui-spinner--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Spinner color={color} />);
        expect(screen.getByRole('status')).toHaveClass(`lui-spinner--${color}`);
      });
    });
  });

  describe('Label', () => {
    it('renders label', () => {
      render(<Spinner label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('applies label placement classes', () => {
      const placements = ['top', 'bottom', 'left', 'right'] as const;
      
      placements.forEach((placement) => {
        const { unmount } = render(<Spinner label="Loading" labelPlacement={placement} />);
        expect(screen.getByRole('status')).toHaveClass(`lui-spinner--label-${placement}`);
        unmount();
      });
    });
  });

  describe('Animation', () => {
    it('applies no-animation class when disableAnimation is true', () => {
      render(<Spinner disableAnimation />);
      expect(screen.getByRole('status')).toHaveClass('lui-spinner--no-animation');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Spinner ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});


