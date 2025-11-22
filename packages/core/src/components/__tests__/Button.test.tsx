import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders as a button by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('renders as custom element when as prop is provided', () => {
      render(
        <Button as="a" href="/test">
          Link Button
        </Button>
      );
      const element = screen.getByRole('link', { name: /link button/i });
      expect(element.tagName).toBe('A');
      expect(element).toHaveAttribute('href', '/test');
    });

    it('applies default classes', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('lui-btn');
      expect(button).toHaveClass('lui-btn--solid');
      expect(button).toHaveClass('lui-btn--default');
      expect(button).toHaveClass('lui-btn--md');
      expect(button).toHaveClass('lui-btn--radius-lg');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    const variants = ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Button variant={variant}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`lui-btn--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Button color={color}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`lui-btn--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Button size={size}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`lui-btn--${size}`);
      });
    });
  });

  describe('Radius', () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;

    radii.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        render(<Button radius={radius}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`lui-btn--radius-${radius}`);
      });
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Button isDisabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('lui-btn--disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders disabled state via disabled prop', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('renders loading state', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });

    it('shows spinner when loading', () => {
      render(<Button isLoading>Loading</Button>);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('shows spinner at start when spinnerPlacement is start', () => {
      const { container } = render(
        <Button isLoading spinnerPlacement="start">
          Loading
        </Button>
      );
      const spinner = container.querySelector('.lui-btn__spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('shows spinner at end when spinnerPlacement is end', () => {
      const { container } = render(
        <Button isLoading spinnerPlacement="end">
          Loading
        </Button>
      );
      const spinner = container.querySelector('.lui-btn__spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('renders icon-only button', () => {
      render(<Button isIconOnly>★</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('lui-btn--icon-only');
    });

    it('renders full-width button', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('lui-btn--full-width');
    });
  });

  describe('Content', () => {
    it('renders startContent', () => {
      render(<Button startContent={<span>Start</span>}>Button</Button>);
      const startContent = screen.getByText('Start');
      expect(startContent).toBeInTheDocument();
      expect(startContent.closest('.lui-btn__start-content')).toBeInTheDocument();
    });

    it('renders endContent', () => {
      render(<Button endContent={<span>End</span>}>Button</Button>);
      const endContent = screen.getByText('End');
      expect(endContent).toBeInTheDocument();
      expect(endContent.closest('.lui-btn__end-content')).toBeInTheDocument();
    });

    it('hides startContent when loading', () => {
      render(
        <Button isLoading startContent={<span>Start</span>}>
          Button
        </Button>
      );
      expect(screen.queryByText('Start')).not.toBeInTheDocument();
    });

    it('hides endContent when loading', () => {
      render(
        <Button isLoading endContent={<span>End</span>}>
          Button
        </Button>
      );
      expect(screen.queryByText('End')).not.toBeInTheDocument();
    });

    it('renders custom spinner', () => {
      render(
        <Button isLoading spinner={<span>Custom Spinner</span>}>
          Button
        </Button>
      );
      expect(screen.getByText('Custom Spinner')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button isDisabled onClick={handleClick}>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria attributes when disabled', () => {
      render(<Button isDisabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('has proper aria attributes when loading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Test</Button>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Animation', () => {
    it('applies no-animation class when disableAnimation is true', () => {
      render(<Button disableAnimation>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('lui-btn--no-animation');
    });
  });
});
