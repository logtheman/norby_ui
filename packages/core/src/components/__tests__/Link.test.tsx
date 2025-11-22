import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Link } from '../Link';

describe('Link', () => {
  describe('Rendering', () => {
    it('renders anchor element', () => {
      render(<Link href="/test">Link Text</Link>);
      const link = screen.getByRole('link', { name: /link text/i });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('renders children correctly', () => {
      render(<Link href="/test">Click me</Link>);
      expect(screen.getByRole('link', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Link href="/test">Test</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('lui-link');
      expect(link).toHaveClass('lui-link--md');
      expect(link).toHaveClass('lui-link--primary');
      expect(link).toHaveClass('lui-link--underline-none');
    });
  });

  describe('External Links', () => {
    it('adds external link attributes when isExternal is true', () => {
      render(
        <Link href="https://example.com" isExternal>
          External
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows anchor icon when showAnchorIcon is true', () => {
      render(
        <Link href="/test" showAnchorIcon>
          Link
        </Link>
      );
      const icon = document.querySelector('.lui-link__anchor-icon');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom anchor icon', () => {
      render(
        <Link href="/test" showAnchorIcon anchorIcon={<span>🔗</span>}>
          Link
        </Link>
      );
      expect(screen.getByText('🔗')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <Link href="/test" size={size}>
            Test
          </Link>
        );
        expect(screen.getByRole('link')).toHaveClass(`lui-link--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = ['foreground', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(
          <Link href="/test" color={color}>
            Test
          </Link>
        );
        expect(screen.getByRole('link')).toHaveClass(`lui-link--${color}`);
      });
    });
  });

  describe('Underline', () => {
    const underlines = ['none', 'hover', 'always', 'active', 'focus'] as const;

    underlines.forEach((underline) => {
      it(`renders with ${underline} underline`, () => {
        render(
          <Link href="/test" underline={underline}>
            Test
          </Link>
        );
        expect(screen.getByRole('link')).toHaveClass(`lui-link--underline-${underline}`);
      });
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      const { container } = render(
        <Link href="/test" isDisabled>
          Disabled
        </Link>
      );
      const link = container.querySelector('a.lui-link--disabled') || screen.getByText('Disabled');
      expect(link).toHaveClass('lui-link--disabled');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).not.toHaveAttribute('href');
    });

    it('renders block state', () => {
      render(
        <Link href="/test" isBlock>
          Block
        </Link>
      );
      expect(screen.getByRole('link')).toHaveClass('lui-link--block');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Link ref={ref} href="/test">
          Test
        </Link>
      );
      expect(ref).toHaveBeenCalled();
    });
  });
});
