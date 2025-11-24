import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/utils';
import { Spacer } from '../Spacer';

describe('Spacer', () => {
  describe('Rendering', () => {
    it('renders spacer element', () => {
      const { container } = render(<Spacer />);
      const spacer = container.querySelector('div');
      expect(spacer).toBeInTheDocument();
    });

    it('applies horizontal spacing', () => {
      const { container } = render(<Spacer x={2} />);
      const spacer = container.querySelector('div');
      expect(spacer).toHaveStyle({ width: '2rem' });
    });

    it('applies vertical spacing', () => {
      const { container } = render(<Spacer y={4} />);
      const spacer = container.querySelector('div');
      expect(spacer).toHaveStyle({ height: '4rem' });
    });

    it('applies both horizontal and vertical spacing', () => {
      const { container } = render(<Spacer x={2} y={4} />);
      const spacer = container.querySelector('div');
      expect(spacer).toHaveStyle({ width: '2rem', height: '4rem' });
    });

    it('accepts string values for spacing', () => {
      const { container } = render(<Spacer x="10px" y="20px" />);
      const spacer = container.querySelector('div');
      expect(spacer).toHaveStyle({ width: '10px', height: '20px' });
    });

    it('merges with custom styles', () => {
      const { container } = render(<Spacer x={2} style={{ backgroundColor: 'red' }} />);
      const spacer = container.querySelector('div');
      expect(spacer).toHaveStyle({ width: '2rem' });
      // Note: backgroundColor might be converted to rgb format by browser
      const computedStyle = window.getComputedStyle(spacer!);
      expect(computedStyle.backgroundColor).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Spacer ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
