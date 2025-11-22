import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  color?: Color;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      color = 'primary',
      isDisabled = false,
      disableAnimation = false,
      className,
      children,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    const controlled = checked !== undefined;
    const currentChecked = controlled ? checked : isChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!controlled) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const cls = cx(
      'lui-switch',
      `lui-switch--${size}`,
      `lui-switch--${color}`,
      currentChecked && 'lui-switch--checked',
      isDisabled && 'lui-switch--disabled',
      disableAnimation && 'lui-switch--no-animation',
      className
    );

    return (
      <label className={cls}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          checked={controlled ? checked : isChecked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={isDisabled}
          aria-checked={currentChecked}
          aria-disabled={isDisabled || undefined}
          className="lui-switch__input"
          {...props}
        />
        <span className="lui-switch__track">
          <span className="lui-switch__thumb" />
        </span>
        {children && <span className="lui-switch__label">{children}</span>}
      </label>
    );
  }
);
Switch.displayName = 'Switch';
