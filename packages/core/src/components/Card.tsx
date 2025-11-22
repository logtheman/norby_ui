import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'shadow';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  radius?: Radius;
  isPressable?: boolean;
  isHoverable?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'flat',
      radius = 'lg',
      isPressable = false,
      isHoverable = false,
      disableAnimation = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const handleMouseDown = () => {
      if (isPressable) setIsPressed(true);
    };

    const handleMouseUp = () => {
      if (isPressable) setIsPressed(false);
    };

    const handleMouseLeave = () => {
      if (isPressable) setIsPressed(false);
    };

    const cls = cx(
      'lui-card',
      `lui-card--${variant}`,
      `lui-card--radius-${radius}`,
      isPressable && 'lui-card--pressable',
      isHoverable && 'lui-card--hoverable',
      isPressed && 'lui-card--pressed',
      disableAnimation && 'lui-card--no-animation',
      className
    );

    return (
      <div
        ref={ref}
        className={cls}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        role={isPressable ? 'button' : undefined}
        tabIndex={isPressable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-card__header', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-card__body', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-card__footer', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
CardFooter.displayName = 'CardFooter';
