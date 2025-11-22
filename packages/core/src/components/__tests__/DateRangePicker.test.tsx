import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { DateRangePicker } from '../DateRangePicker';

describe('DateRangePicker', () => {
  describe('Rendering', () => {
    it('renders start and end date inputs', () => {
      const { container } = render(<DateRangePicker />);
      const inputs = container.querySelectorAll('input[type="date"]');
      expect(inputs).toHaveLength(2);
      expect(inputs[0]).toHaveAttribute('placeholder', 'Start date');
      expect(inputs[1]).toHaveAttribute('placeholder', 'End date');
    });

    it('renders label', () => {
      render(<DateRangePicker label="Date Range" />);
      expect(screen.getByText('Date Range')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<DateRangePicker description="Select a date range" />);
      expect(screen.getByText('Select a date range')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<DateRangePicker errorMessage="Invalid range" isInvalid />);
      expect(screen.getByText('Invalid range')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onStartDateChange when start date changes', async () => {
      const handleStartDateChange = vi.fn();
      const user = userEvent.setup();
      const { container } = render(<DateRangePicker onStartDateChange={handleStartDateChange} />);
      
      const inputs = container.querySelectorAll('input[type="date"]');
      await user.type(inputs[0], '2024-01-01');
      expect(handleStartDateChange).toHaveBeenCalled();
    });

    it('calls onEndDateChange when end date changes', async () => {
      const handleEndDateChange = vi.fn();
      const user = userEvent.setup();
      const { container } = render(<DateRangePicker onEndDateChange={handleEndDateChange} />);
      
      const inputs = container.querySelectorAll('input[type="date"]');
      await user.type(inputs[1], '2024-12-31');
      expect(handleEndDateChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      const { container } = render(<DateRangePicker isDisabled />);
      const inputs = container.querySelectorAll('input[type="date"]');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('renders invalid state', () => {
      const { container } = render(<DateRangePicker isInvalid />);
      const inputs = container.querySelectorAll('input[type="date"]');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<DateRangePicker ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});


