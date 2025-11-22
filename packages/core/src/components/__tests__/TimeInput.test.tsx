import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { TimeInput } from '../TimeInput';

describe('TimeInput', () => {
  describe('Rendering', () => {
    it('renders time input element', () => {
      render(<TimeInput />);
      const input = document.querySelector('input[type="time"]');
      expect(input).toBeInTheDocument();
    });

    it('renders label', () => {
      render(<TimeInput label="Time" />);
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<TimeInput description="Select a time" />);
      expect(screen.getByText('Select a time')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<TimeInput errorMessage="Invalid time" />);
      expect(screen.getByText('Invalid time')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<TimeInput />);
      const wrapper = document.querySelector('.lui-time-input__wrapper');
      expect(wrapper).toHaveClass('lui-time-input__wrapper--bordered');
      expect(wrapper).toHaveClass('lui-time-input__wrapper--default');
      expect(wrapper).toHaveClass('lui-time-input__wrapper--md');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<TimeInput onChange={handleChange} />);

      const input = document.querySelector('input[type="time"]') as HTMLInputElement;
      await user.type(input, '12:00');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'faded', 'underlined'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<TimeInput variant={variant} />);
        const wrapper = document.querySelector('.lui-time-input__wrapper');
        expect(wrapper).toHaveClass(`lui-time-input__wrapper--${variant}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<TimeInput size={size} />);
        const wrapper = document.querySelector('.lui-time-input__wrapper');
        expect(wrapper).toHaveClass(`lui-time-input__wrapper--${size}`);
      });
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<TimeInput isDisabled />);
      const input = document.querySelector('input[type="time"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('renders invalid state', () => {
      render(<TimeInput isInvalid />);
      const input = document.querySelector('input[type="time"]') as HTMLInputElement;
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows required indicator', () => {
      render(<TimeInput label="Time" isRequired />);
      const required = document.querySelector('.lui-time-input__required');
      expect(required).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders startContent', () => {
      render(<TimeInput startContent={<span>🕐</span>} />);
      expect(screen.getByText('🕐')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<TimeInput label="Time" />);
      const input = screen.getByLabelText('Time');
      expect(input).toBeInTheDocument();
    });

    it('associates description with input', () => {
      render(<TimeInput description="Helper text" />);
      const input = document.querySelector('input[type="time"]') as HTMLInputElement;
      const descriptionId = input.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<TimeInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
