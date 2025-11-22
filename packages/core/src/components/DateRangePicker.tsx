import * as React from 'react';
import { TextField } from './TextField';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface DateRangePickerProps {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  label?: string;
  description?: string;
  errorMessage?: string;
  startContent?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  min?: string;
  max?: string;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      variant = 'bordered',
      color = 'default',
      size = 'md',
      radius = 'lg',
      label,
      description,
      errorMessage,
      startContent,
      isRequired = false,
      isDisabled = false,
      isInvalid = false,
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      min,
      max,
      className
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cx('lui-date-range-picker', className)}>
        {label && (
          <div className="lui-date-range-picker__label">
            {label}
            {isRequired && <span className="lui-date-range-picker__required">*</span>}
          </div>
        )}
        <div className="lui-date-range-picker__wrapper">
          <TextField
            type="date"
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            placeholder="Start date"
            value={startDate}
            onChange={(e) => onStartDateChange?.(e.target.value)}
            startContent={startContent}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            min={min}
            max={endDate || max}
            className="lui-date-range-picker__start"
          />
          <span className="lui-date-range-picker__separator">to</span>
          <TextField
            type="date"
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            placeholder="End date"
            value={endDate}
            onChange={(e) => onEndDateChange?.(e.target.value)}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            min={startDate || min}
            max={max}
            className="lui-date-range-picker__end"
          />
        </div>
        {description && !isInvalid && (
          <div className="lui-date-range-picker__description">{description}</div>
        )}
        {errorMessage && isInvalid && (
          <div className="lui-date-range-picker__error">{errorMessage}</div>
        )}
      </div>
    );
  }
);
DateRangePicker.displayName = 'DateRangePicker';


