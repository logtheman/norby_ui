import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type LabelPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
  color?: Color;
  label?: React.ReactNode;
  labelPlacement?: LabelPlacement;
  disableAnimation?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      label,
      labelPlacement = 'bottom',
      disableAnimation = false,
      className,
      ...props
    },
    ref
  ) => {
    const cls = cx(
      'lui-spinner',
      `lui-spinner--${size}`,
      `lui-spinner--${color}`,
      label ? `lui-spinner--label-${labelPlacement}` : false,
      disableAnimation && 'lui-spinner--no-animation',
      className
    );

    return (
      <div ref={ref} className={cls} role="status" aria-live="polite" {...props}>
        <span className="lui-spinner__circle" aria-hidden="true" />
        {label && <span className="lui-spinner__label">{label}</span>}
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';
