import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type LabelPlacement = 'inside' | 'outside' | 'outside-left' | 'outside-right';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: Size;
  color?: Color;
  radius?: Radius;
  label?: React.ReactNode;
  labelPlacement?: LabelPlacement;
  showValueLabel?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  disableAnimation?: boolean;
  isIndeterminate?: boolean;
  className?: string;
}

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: Size;
  color?: Color;
  label?: React.ReactNode;
  showValueLabel?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  disableAnimation?: boolean;
  isIndeterminate?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      size = 'md',
      color = 'primary',
      radius = 'full',
      label,
      labelPlacement = 'outside',
      showValueLabel = false,
      formatOptions,
      disableAnimation = false,
      isIndeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

    const valueLabel = showValueLabel
      ? new Intl.NumberFormat('en-US', formatOptions).format(value)
      : undefined;

    const cls = cx(
      'lui-progress',
      `lui-progress--${size}`,
      `lui-progress--${color}`,
      `lui-progress--radius-${radius}`,
      `lui-progress--label-${labelPlacement}`,
      isIndeterminate && 'lui-progress--indeterminate',
      disableAnimation && 'lui-progress--no-animation',
      className
    );

    return (
      <div ref={ref} className={cls} role="progressbar" aria-valuemin={minValue} aria-valuemax={maxValue} aria-valuenow={isIndeterminate ? undefined : value} {...props}>
        {(label || valueLabel) && labelPlacement !== 'inside' && (
          <div className="lui-progress__label">
            {label}
            {showValueLabel && valueLabel && <span className="lui-progress__value">{valueLabel}</span>}
          </div>
        )}
        <div className="lui-progress__track">
          <div
            className="lui-progress__fill"
            style={{ width: `${percentage}%` }}
            role="presentation"
          >
            {labelPlacement === 'inside' && (label || valueLabel) && (
              <div className="lui-progress__label">
                {label}
                {showValueLabel && valueLabel && <span className="lui-progress__value">{valueLabel}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      size = 'md',
      color = 'primary',
      label,
      showValueLabel = false,
      formatOptions,
      disableAnimation = false,
      isIndeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

    const valueLabel = showValueLabel
      ? new Intl.NumberFormat('en-US', formatOptions).format(value)
      : undefined;

    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (percentage / 100) * circumference;

    const cls = cx(
      'lui-circular-progress',
      `lui-circular-progress--${size}`,
      `lui-circular-progress--${color}`,
      isIndeterminate && 'lui-circular-progress--indeterminate',
      disableAnimation && 'lui-circular-progress--no-animation',
      className
    );

    return (
      <div ref={ref} className={cls} role="progressbar" aria-valuemin={minValue} aria-valuemax={maxValue} aria-valuenow={isIndeterminate ? undefined : value} {...props}>
        <svg className="lui-circular-progress__svg" viewBox="0 0 100 100">
          <circle
            className="lui-circular-progress__track"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
          />
          <circle
            className="lui-circular-progress__fill"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        {(label || valueLabel) && (
          <div className="lui-circular-progress__content">
            {label && <div className="lui-circular-progress__label">{label}</div>}
            {showValueLabel && valueLabel && (
              <div className="lui-circular-progress__value">{valueLabel}</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';


