import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders with image src', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      const img = screen.getByAltText('User');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders fallback when no src provided', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders custom fallback', () => {
      render(<Avatar fallback={<span>Custom</span>} />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <Avatar>
          <span>Badge</span>
        </Avatar>
      );
      expect(screen.getByText('Badge')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Avatar name="Test" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveClass('lui-avatar');
      expect(avatar).toHaveClass('lui-avatar--md');
      expect(avatar).toHaveClass('lui-avatar--radius-full');
    });
  });

  describe('Initials', () => {
    it('generates initials from single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('JO')).toBeInTheDocument();
    });

    it('generates initials from full name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates initials from multiple words', () => {
      render(<Avatar name="John Michael Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('shows question mark when no name provided', () => {
      render(<Avatar />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Avatar size={size} name="Test" />);
        expect(screen.getByRole('img')).toHaveClass(`lui-avatar--${size}`);
      });
    });
  });

  describe('Radius', () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;

    radii.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        render(<Avatar radius={radius} name="Test" />);
        expect(screen.getByRole('img')).toHaveClass(`lui-avatar--radius-${radius}`);
      });
    });
  });

  describe('States', () => {
    it('renders bordered state', () => {
      render(<Avatar isBordered name="Test" />);
      expect(screen.getByRole('img')).toHaveClass('lui-avatar--bordered');
    });

    it('renders disabled state', () => {
      render(<Avatar isDisabled name="Test" />);
      expect(screen.getByRole('img')).toHaveClass('lui-avatar--disabled');
    });
  });

  describe('Image Error Handling', () => {
    it('shows fallback when image fails to load', async () => {
      const { container } = render(<Avatar src="invalid.jpg" name="John Doe" />);
      const img = container.querySelector('img') as HTMLImageElement;

      // Simulate image error
      if (img) {
        const errorEvent = new Event('error', { bubbles: true });
        Object.defineProperty(errorEvent, 'target', { value: img, enumerable: true });
        img.dispatchEvent(errorEvent);
      }

      // Wait for state update and check fallback
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label from alt prop', () => {
      render(<Avatar src="test.jpg" alt="User Avatar" />);
      const avatars = screen.getAllByRole('img');
      const avatar = avatars.find((el) => el.getAttribute('aria-label') === 'User Avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('aria-label', 'User Avatar');
    });

    it('has aria-label from name prop when no alt', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Avatar ref={ref} name="Test" />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
