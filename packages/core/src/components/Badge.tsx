import * as React from 'react';

type Variant = 'solid' | 'bordered' | 'flat' | 'faded' | 'dot';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  content?: React.ReactNode;
  isInvisible?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'default',
      size = 'md',
      radius = 'full',
      content,
      isInvisible = false,
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cls = cx(
      'lui-badge',
      `lui-badge--${variant}`,
      `lui-badge--${color}`,
      `lui-badge--${size}`,
      `lui-badge--radius-${radius}`,
      isInvisible && 'lui-badge--invisible',
      disableAnimation && 'lui-badge--no-animation',
      className
    );

    if (variant === 'dot') {
      return (
        <span
          ref={ref}
          className={cls}
          aria-label={typeof content === 'string' ? content : undefined}
          {...props}
        />
      );
    }

    return (
      <span ref={ref} className={cls} {...props}>
        {content !== undefined ? content : children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
