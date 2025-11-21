import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { RangeCalendar } from '../RangeCalendar';

describe('RangeCalendar', () => {
  describe('Rendering', () => {
    it('renders calendar element', () => {
      render(<RangeCalendar />);
      const calendar = document.querySelector('.lui-range-calendar');
      expect(calendar).toBeInTheDocument();
    });

    it('renders placeholder note', () => {
      render(<RangeCalendar />);
      expect(screen.getByText(/full calendar implementation/i)).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('accepts value prop', () => {
      const value = { start: new Date('2024-01-01'), end: new Date('2024-01-31') };
      render(<RangeCalendar value={value} />);
      const calendar = document.querySelector('.lui-range-calendar');
      expect(calendar).toBeInTheDocument();
    });

    it('accepts defaultValue prop', () => {
      const defaultValue = { start: new Date('2024-01-01'), end: new Date('2024-01-31') };
      render(<RangeCalendar defaultValue={defaultValue} />);
      const calendar = document.querySelector('.lui-range-calendar');
      expect(calendar).toBeInTheDocument();
    });

    it('accepts isDisabled prop', () => {
      render(<RangeCalendar isDisabled />);
      const calendar = document.querySelector('.lui-range-calendar');
      expect(calendar).toBeInTheDocument();
    });

    it('accepts isReadOnly prop', () => {
      render(<RangeCalendar isReadOnly />);
      const calendar = document.querySelector('.lui-range-calendar');
      expect(calendar).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<RangeCalendar ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});


