import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/utils';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toHaveClass('lui-skeleton--radius-md');
    });

    it('renders children when loaded', () => {
      const { container } = render(
        <Skeleton isLoaded>
          <div>Loaded content</div>
        </Skeleton>
      );
      expect(container.textContent).toContain('Loaded content');
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toHaveClass('lui-skeleton--loaded');
    });
  });

  describe('Radius', () => {
    const radiuses = ['none', 'sm', 'md', 'lg', 'full'] as const;

    radiuses.forEach((radius) => {
      it(`renders with ${radius} radius`, () => {
        const { container } = render(<Skeleton radius={radius} />);
        const skeleton = container.querySelector('.lui-skeleton');
        expect(skeleton).toHaveClass(`lui-skeleton--radius-${radius}`);
      });
    });
  });

  describe('States', () => {
    it('renders loading state by default', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toHaveAttribute('aria-busy', 'true');
      expect(skeleton).toHaveAttribute('aria-live', 'polite');
    });

    it('renders loaded state', () => {
      const { container } = render(<Skeleton isLoaded>Content</Skeleton>);
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toHaveClass('lui-skeleton--loaded');
      expect(skeleton).not.toHaveAttribute('aria-busy');
    });

    it('disables animation when disableAnimation is true', () => {
      const { container } = render(<Skeleton disableAnimation />);
      const skeleton = container.querySelector('.lui-skeleton');
      expect(skeleton).toHaveClass('lui-skeleton--no-animation');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Skeleton ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
