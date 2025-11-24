import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders label', () => {
      render(<Textarea label="Message" />);
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<Textarea description="Enter your message" />);
      expect(screen.getByText('Enter your message')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<Textarea errorMessage="Invalid message" />);
      expect(screen.getByText('Invalid message')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Textarea />);
      const wrapper = document.querySelector('.lui-textarea__wrapper');
      expect(wrapper).toHaveClass('lui-textarea__wrapper--bordered');
      expect(wrapper).toHaveClass('lui-textarea__wrapper--default');
      expect(wrapper).toHaveClass('lui-textarea__wrapper--md');
      expect(wrapper).toHaveClass('lui-textarea__wrapper--radius-lg');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'test');
      expect(textarea).toHaveValue('test');
    });

    it('works as controlled component', () => {
      const { rerender } = render(<Textarea value="initial" />);
      const textarea = screen.getByRole('textbox');

      expect(textarea).toHaveValue('initial');

      rerender(<Textarea value="updated" />);
      expect(textarea).toHaveValue('updated');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onValueChange when typing', async () => {
      const handleValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onValueChange={handleValueChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleValueChange).toHaveBeenCalledWith('test');
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'faded', 'underlined'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Textarea variant={variant} />);
        const wrapper = document.querySelector('.lui-textarea__wrapper');
        expect(wrapper).toHaveClass(`lui-textarea__wrapper--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Textarea color={color} />);
        const wrapper = document.querySelector('.lui-textarea__wrapper');
        expect(wrapper).toHaveClass(`lui-textarea__wrapper--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Textarea size={size} />);
        const wrapper = document.querySelector('.lui-textarea__wrapper');
        expect(wrapper).toHaveClass(`lui-textarea__wrapper--${size}`);
      });
    });
  });

  describe('Rows', () => {
    it('applies minRows', () => {
      render(<Textarea minRows={5} />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('applies maxRows via style', () => {
      render(<Textarea maxRows={10} />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.style.maxHeight).toBeTruthy();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Textarea isDisabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders read-only state', () => {
      render(<Textarea isReadOnly defaultValue="readonly" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('readonly');
      expect(textarea).toHaveAttribute('aria-readonly', 'true');
    });

    it('renders invalid state', () => {
      render(<Textarea isInvalid />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders invalid state when errorMessage is provided', () => {
      render(<Textarea errorMessage="Error" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows required indicator', () => {
      render(<Textarea label="Message" isRequired />);
      const required = document.querySelector('.lui-textarea__required');
      expect(required).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with textarea', () => {
      render(<Textarea label="Message" />);
      const textarea = screen.getByLabelText('Message');
      expect(textarea).toBeInTheDocument();
    });

    it('associates description with textarea', () => {
      render(<Textarea description="Helper text" />);
      const textarea = screen.getByRole('textbox');
      const descriptionId = textarea.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
    });

    it('associates error message with textarea', () => {
      render(<Textarea errorMessage="Error" />);
      const textarea = screen.getByRole('textbox');
      const errorId = textarea.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
