import * as React from 'react';

export interface RangeCalendarProps {
  value?: { start?: Date; end?: Date };
  defaultValue?: { start?: Date; end?: Date };
  onChange?: (range: { start?: Date; end?: Date }) => void;
  minValue?: Date;
  maxValue?: Date;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

export const RangeCalendar = React.forwardRef<HTMLDivElement, RangeCalendarProps>(
  (
    {
      value: _value,
      defaultValue: _defaultValue,
      onChange: _onChange,
      minValue: _minValue,
      maxValue: _maxValue,
      isDisabled: _isDisabled = false,
      isReadOnly: _isReadOnly = false,
      className
    },
    ref
  ) => {
    // Simplified implementation - full calendar would require a date library
    // This provides the API structure matching HeroUI
    return (
      <div ref={ref} className={`lui-range-calendar ${className || ''}`}>
        <div className="lui-range-calendar__note">
          Full calendar implementation requires a date library (e.g., date-fns, dayjs).
          This is a placeholder component matching HeroUI&apos;s API structure.
        </div>
      </div>
    );
  }
);
RangeCalendar.displayName = 'RangeCalendar';


