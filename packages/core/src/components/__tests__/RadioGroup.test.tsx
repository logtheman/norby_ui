import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { RadioGroup, Radio } from '../RadioGroup';

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders radios in group', () => {
      render(
        <RadioGroup>
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
        </RadioGroup>
      );
      expect(screen.getByRole('radio', { name: /option 1/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /option 2/i })).toBeInTheDocument();
    });

    it('renders label', () => {
      render(
        <RadioGroup label="Group Label">
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <RadioGroup description="Helper text">
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(
        <RadioGroup errorMessage="Error message">
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: /option 1/i });
      await user.click(radio1);
      expect(radio1).toBeChecked();
    });

    it('works as controlled component', () => {
      render(
        <RadioGroup value="1">
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
        </RadioGroup>
      );

      expect(screen.getByRole('radio', { name: /option 1/i })).toBeChecked();
      expect(screen.getByRole('radio', { name: /option 2/i })).not.toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when radio is selected', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <RadioGroup onChange={handleChange}>
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
        </RadioGroup>
      );

      await user.click(screen.getByRole('radio', { name: /option 2/i }));
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('only allows one selection at a time', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="3">Option 3</Radio>
        </RadioGroup>
      );

      await user.click(screen.getByRole('radio', { name: /option 1/i }));
      expect(screen.getByRole('radio', { name: /option 1/i })).toBeChecked();

      await user.click(screen.getByRole('radio', { name: /option 2/i }));
      expect(screen.getByRole('radio', { name: /option 1/i })).not.toBeChecked();
      expect(screen.getByRole('radio', { name: /option 2/i })).toBeChecked();
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <RadioGroup orientation="horizontal">
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveClass('lui-radio-group--horizontal');
    });

    it('renders vertical orientation', () => {
      render(
        <RadioGroup orientation="vertical">
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveClass('lui-radio-group--vertical');
    });
  });

  describe('States', () => {
    it('disables all radios when group is disabled', () => {
      render(
        <RadioGroup isDisabled>
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('shows required indicator', () => {
      render(
        <RadioGroup label="Group" isRequired>
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      const required = document.querySelector('.lui-radio-group__required');
      expect(required).toBeInTheDocument();
    });

    it('shows invalid state', () => {
      render(
        <RadioGroup isInvalid>
          <Radio value="1">Option 1</Radio>
        </RadioGroup>
      );
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveClass('lui-radio-group--invalid');
    });
  });
});

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders radio input', () => {
      render(
        <RadioGroup>
          <Radio value="1">Label</Radio>
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('renders label text', () => {
      render(
        <RadioGroup>
          <Radio value="1">Radio Label</Radio>
        </RadioGroup>
      );
      expect(screen.getByText('Radio Label')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <RadioGroup>
          <Radio value="1" description="Helper text">
            Label
          </Radio>
        </RadioGroup>
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders checked state', () => {
      render(
        <RadioGroup value="1">
          <Radio value="1">Checked</Radio>
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
      expect(radio.closest('label')).toHaveClass('lui-radio--checked');
    });

    it('renders disabled state', () => {
      render(
        <RadioGroup>
          <Radio value="1" isDisabled>
            Disabled
          </Radio>
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
      expect(radio.closest('label')).toHaveClass('lui-radio--disabled');
    });

    it('renders read-only state', () => {
      render(
        <RadioGroup>
          <Radio value="1" isReadOnly>
            Read Only
          </Radio>
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('readOnly');
      expect(radio.closest('label')).toHaveClass('lui-radio--readonly');
    });

    it('renders invalid state', () => {
      render(
        <RadioGroup>
          <Radio value="1" isInvalid>
            Invalid
          </Radio>
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-invalid', 'true');
      expect(radio.closest('label')).toHaveClass('lui-radio--invalid');
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <RadioGroup size={size}>
            <Radio value="1">Test</Radio>
          </RadioGroup>
        );
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-radio--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(
          <RadioGroup color={color}>
            <Radio value="1">Test</Radio>
          </RadioGroup>
        );
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-radio--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <RadioGroup>
          <Radio ref={ref} value="1">
            Test
          </Radio>
        </RadioGroup>
      );
      expect(ref).toHaveBeenCalled();
    });
  });
});
