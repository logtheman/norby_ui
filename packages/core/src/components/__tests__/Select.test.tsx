import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

describe('Select', () => {
  describe('Rendering', () => {
    it('renders select element', () => {
      render(
        <Select>
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders label', () => {
      render(
        <Select label="Country">
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <Select description="Select a country">
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByText('Select a country')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(
        <Select errorMessage="Required field">
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('renders placeholder option', () => {
      render(
        <Select placeholder="Choose an option">
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByRole('option', { name: 'Choose an option' })).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is selected', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select onChange={handleChange}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      );

      const select = screen.getByRole('combobox');
      await user.selectOptions(select, '2');
      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value when option is selected', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      );

      const select = screen.getByRole('combobox') as HTMLSelectElement;
      await user.selectOptions(select, '2');
      expect(select.value).toBe('2');
    });
  });

  describe('Variants', () => {
    const variants = ['flat', 'bordered', 'faded', 'underlined'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(
          <Select variant={variant}>
            <option value="1">Option 1</option>
          </Select>
        );
        const wrapper = document.querySelector('.lui-select__wrapper');
        expect(wrapper).toHaveClass(`lui-select__wrapper--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(
          <Select color={color}>
            <option value="1">Option 1</option>
          </Select>
        );
        const wrapper = document.querySelector('.lui-select__wrapper');
        expect(wrapper).toHaveClass(`lui-select__wrapper--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <Select size={size}>
            <option value="1">Option 1</option>
          </Select>
        );
        const wrapper = document.querySelector('.lui-select__wrapper');
        expect(wrapper).toHaveClass(`lui-select__wrapper--${size}`);
      });
    });
  });

  describe('Content', () => {
    it('renders startContent', () => {
      render(
        <Select startContent={<span>🔍</span>}>
          <option value="1">Option 1</option>
        </Select>
      );
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(
        <Select isDisabled>
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    });

    it('renders invalid state', () => {
      render(
        <Select isInvalid>
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders invalid state when errorMessage is provided', () => {
      render(
        <Select errorMessage="Error">
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows required indicator', () => {
      render(
        <Select label="Country" isRequired>
          <option value="1">Option 1</option>
        </Select>
      );
      const required = document.querySelector('.lui-select__required');
      expect(required).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with select', () => {
      render(
        <Select label="Country">
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByLabelText('Country');
      expect(select).toBeInTheDocument();
    });

    it('associates description with select', () => {
      render(
        <Select description="Helper text">
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByRole('combobox');
      const descriptionId = select.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
    });

    it('associates error message with select', () => {
      render(
        <Select errorMessage="Error">
          <option value="1">Option 1</option>
        </Select>
      );
      const select = screen.getByRole('combobox');
      const errorId = select.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Select ref={ref}>
          <option value="1">Option 1</option>
        </Select>
      );
      expect(ref).toHaveBeenCalled();
    });
  });
});
