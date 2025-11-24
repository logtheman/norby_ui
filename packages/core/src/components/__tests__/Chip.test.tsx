import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Chip } from '../Chip';

describe('Chip', () => {
  describe('Rendering', () => {
    it('renders chip element', () => {
      render(<Chip>Chip</Chip>);
      expect(screen.getByText('Chip')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Chip>Chip</Chip>);
      const chip = document.querySelector('.lui-chip');
      expect(chip).toHaveClass('lui-chip--solid');
      expect(chip).toHaveClass('lui-chip--default');
      expect(chip).toHaveClass('lui-chip--md');
      expect(chip).toHaveClass('lui-chip--radius-full');
    });
  });

  describe('Variants', () => {
    const variants = ['solid', 'bordered', 'flat', 'faded', 'dot'] as const;

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Chip variant={variant}>Chip</Chip>);
        const chip = document.querySelector('.lui-chip');
        expect(chip).toHaveClass(`lui-chip--${variant}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Chip color={color}>Chip</Chip>);
        const chip = document.querySelector('.lui-chip');
        expect(chip).toHaveClass(`lui-chip--${color}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Chip size={size}>Chip</Chip>);
        const chip = document.querySelector('.lui-chip');
        expect(chip).toHaveClass(`lui-chip--${size}`);
      });
    });
  });

  describe('Content', () => {
    it('renders startContent', () => {
      render(<Chip startContent={<span>@</span>}>Chip</Chip>);
      expect(screen.getByText('@')).toBeInTheDocument();
    });

    it('renders endContent', () => {
      render(<Chip endContent={<span>$</span>}>Chip</Chip>);
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('shows close button when isCloseable', () => {
      render(<Chip isCloseable onClose={() => {}}>Chip</Chip>);
      expect(screen.getByLabelText('Remove chip')).toBeInTheDocument();
    });

    it('hides close button when not closeable', () => {
      render(<Chip>Chip</Chip>);
      expect(screen.queryByLabelText('Remove chip')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      render(<Chip isCloseable onClose={handleClose}>Chip</Chip>);

      await user.click(screen.getByLabelText('Remove chip'));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not render close button when disabled', () => {
      const handleClose = vi.fn();
      render(
        <Chip isCloseable isDisabled onClose={handleClose}>
          Chip
        </Chip>
      );

      expect(screen.queryByLabelText('Remove chip')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Chip isDisabled>Chip</Chip>);
      const chip = document.querySelector('.lui-chip');
      expect(chip).toHaveClass('lui-chip--disabled');
    });
  });

  describe('Dot Variant', () => {
    it('renders dot variant without content', () => {
      render(<Chip variant="dot" aria-label="Dot" />);
      const chip = document.querySelector('.lui-chip');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('lui-chip--dot');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Chip ref={ref}>Chip</Chip>);
      expect(ref).toHaveBeenCalled();
    });
  });
});
