import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { DateRangePicker } from '../DateRangePicker';

describe('DateRangePicker', () => {
  describe('Rendering', () => {
    it('renders start and end date inputs', () => {
      render(<DateRangePicker />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(2);
      expect(inputs[0]).toHaveAttribute('type', 'date');
      expect(inputs[1]).toHaveAttribute('type', 'date');
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
      render(<DateRangePicker errorMessage="Invalid range" />);
      expect(screen.getByText('Invalid range')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onStartDateChange when start date changes', async () => {
      const handleStartDateChange = vi.fn();
      const user = userEvent.setup();
      render(<DateRangePicker onStartDateChange={handleStartDateChange} />);
      
      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0], '2024-01-01');
      expect(handleStartDateChange).toHaveBeenCalled();
    });

    it('calls onEndDateChange when end date changes', async () => {
      const handleEndDateChange = vi.fn();
      const user = userEvent.setup();
      render(<DateRangePicker onEndDateChange={handleEndDateChange} />);
      
      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[1], '2024-12-31');
      expect(handleEndDateChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<DateRangePicker isDisabled />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('renders invalid state', () => {
      render(<DateRangePicker isInvalid />);
      const inputs = screen.getAllByRole('textbox');
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


