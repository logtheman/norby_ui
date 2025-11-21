import * as React from 'react';
import { TextField, TextFieldProps } from './TextField';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface DatePickerProps extends Omit<TextFieldProps, 'type'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  min?: string;
  max?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ variant, color, size, radius, min, max, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        type="date"
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        min={min}
        max={max}
        {...props}
      />
    );
  }
);
DatePicker.displayName = 'DatePicker';


