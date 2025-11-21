import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Divider } from '../Divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders hr element', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider.tagName).toBe('HR');
    });

    it('applies default classes', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('lui-divider');
      expect(divider).toHaveClass('lui-divider--horizontal');
      expect(divider).toHaveClass('lui-divider--default');
    });

    it('applies custom className', () => {
      render(<Divider className="custom-class" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('custom-class');
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation', () => {
      render(<Divider orientation="horizontal" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('lui-divider--horizontal');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical orientation', () => {
      render(<Divider orientation="vertical" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('lui-divider--vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Divider color={color} />);
        const divider = screen.getByRole('separator');
        expect(divider).toHaveClass(`lui-divider--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="separator"', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('has aria-orientation attribute', () => {
      render(<Divider orientation="vertical" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Divider ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});


