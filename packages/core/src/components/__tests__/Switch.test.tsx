import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Switch } from '../Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders switch input', () => {
      render(<Switch>Label</Switch>);
      const switchInput = screen.getByRole('switch');
      expect(switchInput).toBeInTheDocument();
      expect(switchInput).toHaveAttribute('type', 'checkbox');
    });

    it('renders label text', () => {
      render(<Switch>Switch Label</Switch>);
      expect(screen.getByText('Switch Label')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Switch>Test</Switch>);
      const label = screen.getByText('Test').closest('label');
      expect(label).toHaveClass('lui-switch');
      expect(label).toHaveClass('lui-switch--md');
      expect(label).toHaveClass('lui-switch--primary');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Switch>Uncontrolled</Switch>);
      const switchInput = screen.getByRole('switch');
      
      expect(switchInput).not.toBeChecked();
      await user.click(switchInput);
      expect(switchInput).toBeChecked();
    });

    it('works as controlled component', () => {
      const { rerender } = render(<Switch checked={false}>Controlled</Switch>);
      const switchInput = screen.getByRole('switch');
      
      expect(switchInput).not.toBeChecked();
      
      rerender(<Switch checked={true}>Controlled</Switch>);
      expect(switchInput).toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={handleChange}>Test</Switch>);
      
      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      render(<Switch>Test</Switch>);
      const switchInput = screen.getByRole('switch');
      
      await user.click(switchInput);
      expect(switchInput).toBeChecked();
      
      await user.click(switchInput);
      expect(switchInput).not.toBeChecked();
    });
  });

  describe('States', () => {
    it('renders checked state', () => {
      render(<Switch checked>Checked</Switch>);
      const switchInput = screen.getByRole('switch');
      expect(switchInput).toBeChecked();
      expect(switchInput.closest('label')).toHaveClass('lui-switch--checked');
    });

    it('renders disabled state', () => {
      render(<Switch isDisabled>Disabled</Switch>);
      const switchInput = screen.getByRole('switch');
      expect(switchInput).toBeDisabled();
      expect(switchInput).toHaveAttribute('aria-disabled', 'true');
      expect(switchInput.closest('label')).toHaveClass('lui-switch--disabled');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Switch isDisabled>Disabled</Switch>);
      const switchInput = screen.getByRole('switch');
      
      await user.click(switchInput);
      expect(switchInput).not.toBeChecked();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Switch size={size}>Test</Switch>);
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-switch--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Switch color={color}>Test</Switch>);
        const label = screen.getByText('Test').closest('label');
        expect(label).toHaveClass(`lui-switch--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper aria attributes', () => {
      render(<Switch>Test</Switch>);
      const switchInput = screen.getByRole('switch');
      expect(switchInput).toHaveAttribute('aria-checked', 'false');
    });

    it('has aria-checked true when checked', () => {
      render(<Switch checked>Test</Switch>);
      const switchInput = screen.getByRole('switch');
      expect(switchInput).toHaveAttribute('aria-checked', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Switch ref={ref}>Test</Switch>);
      expect(ref).toHaveBeenCalled();
    });
  });
});


