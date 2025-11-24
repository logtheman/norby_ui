import * as React from 'react';

type Variant = 'solid' | 'bordered' | 'flat' | 'faded' | 'dot';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClose?: () => void;
  isCloseable?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = 'solid',
      color = 'default',
      size = 'md',
      radius = 'full',
      startContent,
      endContent,
      onClose,
      isCloseable = false,
      isDisabled = false,
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClose?.();
    };

    const cls = cx(
      'lui-chip',
      `lui-chip--${variant}`,
      `lui-chip--${color}`,
      `lui-chip--${size}`,
      `lui-chip--radius-${radius}`,
      isDisabled && 'lui-chip--disabled',
      disableAnimation && 'lui-chip--no-animation',
      className
    );

    if (variant === 'dot') {
      return (
        <div
          ref={ref}
          className={cls}
          aria-label={typeof children === 'string' ? children : undefined}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cls} {...props}>
        {startContent && <span className="lui-chip__start-content">{startContent}</span>}
        {children && <span className="lui-chip__content">{children}</span>}
        {endContent && <span className="lui-chip__end-content">{endContent}</span>}
        {isCloseable && !isDisabled && (
          <button
            type="button"
            onClick={handleClose}
            className="lui-chip__close-button"
            aria-label="Remove chip"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = 'Chip';
