import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Kbd } from '../Kbd';

describe('Kbd', () => {
  describe('Rendering', () => {
    it('renders kbd element', () => {
      render(<Kbd>Ctrl</Kbd>);
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const kbd = container.querySelector('.lui-kbd');
      expect(kbd).toBeInTheDocument();
      expect(kbd).toHaveClass('lui-kbd--md');
    });
  });

  describe('Keys Prop', () => {
    it('renders single key string', () => {
      render(<Kbd keys="Ctrl" />);
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
    });

    it('renders array of keys with separators', () => {
      render(<Kbd keys={['Ctrl', 'K']} />);
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('K')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('renders multiple keys correctly', () => {
      render(<Kbd keys={['Ctrl', 'Shift', 'P']} />);
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.getByText('Shift')).toBeInTheDocument();
      expect(screen.getByText('P')).toBeInTheDocument();
      const separators = screen.getAllByText('+');
      expect(separators).toHaveLength(2);
    });
  });

  describe('Children', () => {
    it('renders children when keys prop is not provided', () => {
      render(<Kbd>Enter</Kbd>);
      expect(screen.getByText('Enter')).toBeInTheDocument();
    });

    it('prefers keys prop over children', () => {
      render(<Kbd keys="Ctrl">Enter</Kbd>);
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      expect(screen.queryByText('Enter')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        const { container } = render(<Kbd size={size}>Key</Kbd>);
        const kbd = container.querySelector('.lui-kbd');
        expect(kbd).toHaveClass(`lui-kbd--${size}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('uses semantic kbd element', () => {
      const { container } = render(<Kbd>Ctrl</Kbd>);
      const kbd = container.querySelector('kbd');
      expect(kbd).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Kbd ref={ref}>Ctrl</Kbd>);
      expect(ref).toHaveBeenCalled();
    });
  });
});
