import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
  describe('Rendering', () => {
    it('renders date input element', () => {
      render(<DatePicker />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'date');
    });

    it('renders label', () => {
      render(<DatePicker label="Date" />);
      expect(screen.getByLabelText('Date')).toBeInTheDocument();
    });

    it('applies min and max attributes', () => {
      render(<DatePicker min="2024-01-01" max="2024-12-31" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('min', '2024-01-01');
      expect(input).toHaveAttribute('max', '2024-12-31');
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'faded', 'underlined'] as const;
    
    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<DatePicker variant={variant} />);
        const wrapper = document.querySelector('.lui-input__wrapper');
        expect(wrapper).toHaveClass(`lui-input__wrapper--${variant}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<DatePicker ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});


