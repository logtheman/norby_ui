import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { TextField } from '../TextField';

describe('TextField', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<TextField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders label', () => {
      render(<TextField label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<TextField description="Enter your email" />);
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<TextField errorMessage="Invalid email" />);
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<TextField />);
      const wrapper = document.querySelector('.lui-input__wrapper');
      expect(wrapper).toHaveClass('lui-input__wrapper--bordered');
      expect(wrapper).toHaveClass('lui-input__wrapper--default');
      expect(wrapper).toHaveClass('lui-input__wrapper--md');
      expect(wrapper).toHaveClass('lui-input__wrapper--radius-lg');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<TextField />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(input).toHaveValue('test');
    });

    it('works as controlled component', () => {
      const { rerender } = render(<TextField value="initial" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue('initial');

      rerender(<TextField value="updated" />);
      expect(input).toHaveValue('updated');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<TextField onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onValueChange when typing', async () => {
      const handleValueChange = vi.fn();
      const user = userEvent.setup();
      render(<TextField onValueChange={handleValueChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleValueChange).toHaveBeenCalledWith('test');
    });

    it('clears value when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<TextField isClearable defaultValue="test" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue('test');

      const clearButton = screen.getByLabelText('Clear input');
      await user.click(clearButton);
      expect(input).toHaveValue('');
    });

    it('calls onClear when clear button is clicked', async () => {
      const handleClear = vi.fn();
      const user = userEvent.setup();
      render(<TextField isClearable defaultValue="test" onClear={handleClear} />);

      await user.click(screen.getByLabelText('Clear input'));
      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'faded', 'underlined'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<TextField variant={variant} />);
        const wrapper = document.querySelector('.lui-input__wrapper');
        expect(wrapper).toHaveClass(`lui-input__wrapper--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<TextField color={color} />);
        const wrapper = document.querySelector('.lui-input__wrapper');
        expect(wrapper).toHaveClass(`lui-input__wrapper--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<TextField size={size} />);
        const wrapper = document.querySelector('.lui-input__wrapper');
        expect(wrapper).toHaveClass(`lui-input__wrapper--${size}`);
      });
    });
  });

  describe('Content', () => {
    it('renders startContent', () => {
      render(<TextField startContent={<span>@</span>} />);
      expect(screen.getByText('@')).toBeInTheDocument();
    });

    it('renders endContent', () => {
      render(<TextField endContent={<span>$</span>} />);
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('shows clear button when isClearable and has value', () => {
      render(<TextField isClearable defaultValue="test" />);
      expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
    });

    it('hides clear button when no value', () => {
      render(<TextField isClearable />);
      expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<TextField isDisabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders read-only state', () => {
      render(<TextField isReadOnly defaultValue="readonly" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
      expect(input).toHaveAttribute('aria-readonly', 'true');
    });

    it('renders invalid state', () => {
      render(<TextField isInvalid />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders invalid state when errorMessage is provided', () => {
      render(<TextField errorMessage="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows required indicator', () => {
      render(<TextField label="Email" isRequired />);
      const required = document.querySelector('.lui-input__required');
      expect(required).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<TextField label="Email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    it('associates description with input', () => {
      render(<TextField description="Helper text" />);
      const input = screen.getByRole('textbox');
      const descriptionId = input.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
    });

    it('associates error message with input', () => {
      render(<TextField errorMessage="Error" />);
      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<TextField ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
