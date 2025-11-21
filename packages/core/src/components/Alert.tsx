import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'solid';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: Variant;
  color?: Color;
  radius?: Radius;
  title?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'flat',
      color = 'default',
      radius = 'lg',
      title,
      startContent,
      endContent,
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cls = cx(
      'lui-alert',
      `lui-alert--${variant}`,
      `lui-alert--${color}`,
      `lui-alert--radius-${radius}`,
      disableAnimation && 'lui-alert--no-animation',
      className
    );

    return (
      <div ref={ref} className={cls} role="alert" {...props}>
        {startContent && <div className="lui-alert__start-content">{startContent}</div>}
        <div className="lui-alert__content">
          {title && <div className="lui-alert__title">{title}</div>}
          {children && <div className="lui-alert__description">{children}</div>}
        </div>
        {endContent && <div className="lui-alert__end-content">{endContent}</div>}
      </div>
    );
  }
);
Alert.displayName = 'Alert';


