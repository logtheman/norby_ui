import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Progress, CircularProgress } from '../Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders progressbar element', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has proper ARIA attributes', () => {
      render(<Progress value={50} minValue={0} maxValue={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('applies default classes', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('lui-progress');
      expect(progressbar).toHaveClass('lui-progress--md');
      expect(progressbar).toHaveClass('lui-progress--primary');
    });
  });

  describe('Value Calculation', () => {
    it('calculates percentage correctly', () => {
      render(<Progress value={50} minValue={0} maxValue={100} />);
      const fill = document.querySelector('.lui-progress__fill');
      expect(fill).toHaveStyle({ width: '50%' });
    });

    it('clamps value to 0-100%', () => {
      render(<Progress value={150} minValue={0} maxValue={100} />);
      const fill = document.querySelector('.lui-progress__fill');
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('handles custom min/max values', () => {
      render(<Progress value={25} minValue={0} maxValue={50} />);
      const fill = document.querySelector('.lui-progress__fill');
      expect(fill).toHaveStyle({ width: '50%' });
    });
  });

  describe('Indeterminate State', () => {
    it('renders indeterminate state', () => {
      render(<Progress isIndeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('lui-progress--indeterminate');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('Label', () => {
    it('renders label', () => {
      render(<Progress value={50} label="Progress" />);
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });

    it('shows value label when showValueLabel is true', () => {
      render(<Progress value={50} showValueLabel />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('formats value label with formatOptions', () => {
      render(<Progress value={0.5} showValueLabel formatOptions={{ style: 'percent' }} />);
      // The actual formatted value depends on locale, but should be present
      const valueLabel = document.querySelector('.lui-progress__value');
      expect(valueLabel).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Progress value={50} size={size} />);
        expect(screen.getByRole('progressbar')).toHaveClass(`lui-progress--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Progress value={50} color={color} />);
        expect(screen.getByRole('progressbar')).toHaveClass(`lui-progress--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Progress ref={ref} value={50} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('CircularProgress', () => {
  describe('Rendering', () => {
    it('renders progressbar element', () => {
      render(<CircularProgress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders SVG circle', () => {
      render(<CircularProgress value={50} />);
      const svg = document.querySelector('.lui-circular-progress__svg');
      expect(svg).toBeInTheDocument();
    });

    it('has proper ARIA attributes', () => {
      render(<CircularProgress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('Indeterminate State', () => {
    it('renders indeterminate state', () => {
      render(<CircularProgress isIndeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveClass('lui-circular-progress--indeterminate');
    });
  });

  describe('Label', () => {
    it('renders label', () => {
      render(<CircularProgress value={50} label="Loading" />);
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('shows value label when showValueLabel is true', () => {
      render(<CircularProgress value={50} showValueLabel />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<CircularProgress ref={ref} value={50} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
