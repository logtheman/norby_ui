import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Checkbox, CheckboxGroup } from '../Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox input', () => {
      render(<Checkbox>Label</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('renders label text', () => {
      render(<Checkbox>Checkbox Label</Checkbox>);
      expect(screen.getByText('Checkbox Label')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<Checkbox description="Helper text">Label</Checkbox>);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Checkbox>Test</Checkbox>);
      const label = screen.getByText('Test').closest('label');
      expect(label).toHaveClass('lui-checkbox');
      expect(label).toHaveClass('lui-checkbox--md');
      expect(label).toHaveClass('lui-checkbox--primary');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Checkbox>Uncontrolled</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('works as controlled component', async () => {
      const _user = userEvent.setup();
      const { rerender } = render(<Checkbox checked={false}>Controlled</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).not.toBeChecked();
      
      rerender(<Checkbox checked={true}>Controlled</Checkbox>);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onChange={handleChange}>Test</Checkbox>);
      
      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox>Test</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('States', () => {
    it('renders checked state', () => {
      render(<Checkbox checked>Checked</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
      expect(checkbox.closest('label')).toHaveClass('lui-checkbox--checked');
    });

    it('renders indeterminate state', () => {
      render(<Checkbox isIndeterminate>Indeterminate</Checkbox>);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      expect(checkbox.closest('label')).toHaveClass('lui-checkbox--indeterminate');
    });

    it('renders disabled state', () => {
      render(<Checkbox isDisabled>Disabled</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveAttribute('aria-disabled', 'true');
      expect(checkbox.closest('label')).toHaveClass('lui-checkbox--disabled');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Checkbox isDisabled>Disabled</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Checkbox size={size}>Test</Checkbox>);
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-checkbox--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Checkbox color={color}>Test</Checkbox>);
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-checkbox--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper aria attributes', () => {
      render(<Checkbox description="Helper">Test</Checkbox>);
      const checkbox = screen.getByRole('checkbox');
      const descriptionId = checkbox.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Checkbox ref={ref}>Test</Checkbox>);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('CheckboxGroup', () => {
  describe('Rendering', () => {
    it('renders checkboxes in group', () => {
      render(
        <CheckboxGroup>
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
        </CheckboxGroup>
      );
      expect(screen.getByRole('checkbox', { name: /option 1/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /option 2/i })).toBeInTheDocument();
    });

    it('renders label', () => {
      render(
        <CheckboxGroup label="Group Label">
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <CheckboxGroup description="Helper text">
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(
        <CheckboxGroup errorMessage="Error message">
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <CheckboxGroup>
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
        </CheckboxGroup>
      );
      
      const checkbox1 = screen.getByRole('checkbox', { name: /option 1/i });
      await user.click(checkbox1);
      expect(checkbox1).toBeChecked();
    });

    it('works as controlled component', () => {
      render(
        <CheckboxGroup value={['1']}>
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
        </CheckboxGroup>
      );
      
      expect(screen.getByRole('checkbox', { name: /option 1/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /option 2/i })).not.toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when checkbox is clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <CheckboxGroup onChange={handleChange}>
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      
      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(['1']);
    });

    it('manages multiple selections', async () => {
      const user = userEvent.setup();
      render(
        <CheckboxGroup>
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
          <Checkbox value="3">Option 3</Checkbox>
        </CheckboxGroup>
      );
      
      await user.click(screen.getByRole('checkbox', { name: /option 1/i }));
      await user.click(screen.getByRole('checkbox', { name: /option 2/i }));
      
      expect(screen.getByRole('checkbox', { name: /option 1/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /option 2/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /option 3/i })).not.toBeChecked();
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <CheckboxGroup orientation="horizontal">
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('lui-checkbox-group--horizontal');
    });

    it('renders vertical orientation', () => {
      render(
        <CheckboxGroup orientation="vertical">
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      const group = screen.getByRole('group');
      expect(group).toHaveClass('lui-checkbox-group--vertical');
    });
  });

  describe('States', () => {
    it('disables all checkboxes when group is disabled', () => {
      render(
        <CheckboxGroup isDisabled>
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('shows required indicator', () => {
      render(
        <CheckboxGroup label="Group" isRequired>
          <Checkbox value="1">Option 1</Checkbox>
        </CheckboxGroup>
      );
      const required = document.querySelector('.lui-checkbox-group__required');
      expect(required).toBeInTheDocument();
    });
  });
});


