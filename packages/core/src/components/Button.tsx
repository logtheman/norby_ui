import * as React from 'react';

type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type SpinnerPlacement = 'start' | 'end';

type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  spinner?: React.ReactNode;
  spinnerPlacement?: SpinnerPlacement;
  isLoading?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const DefaultSpinner = () => (
  <span className="lui-btn__spinner" role="status" aria-live="polite" />
);

export const Button = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      color = 'default',
      size = 'md',
      radius = 'lg',
      startContent,
      endContent,
      spinner,
      spinnerPlacement = 'start',
      isLoading = false,
      isIconOnly = false,
      isDisabled = false,
      fullWidth = false,
      disableRipple = false,
      disableAnimation = false,
      className,
      children,
      disabled,
      ...rest
    }: PolymorphicProps<E>,
    ref: React.Ref<Element>
  ) => {
    const Comp = (as || 'button') as any;
    const disabledState = disabled || isDisabled || isLoading;

    const spinnerComponent = spinner || <DefaultSpinner />;
    const showSpinner = isLoading;
    const showStartContent = startContent && !showSpinner;
    const showEndContent = endContent && !showSpinner;

    const cls = cx(
      'lui-btn',
      `lui-btn--${variant}`,
      `lui-btn--${color}`,
      `lui-btn--${size}`,
      `lui-btn--radius-${radius}`,
      isIconOnly && 'lui-btn--icon-only',
      fullWidth && 'lui-btn--full-width',
      disabledState && 'lui-btn--disabled',
      disableAnimation && 'lui-btn--no-animation',
      className
    );

    const ariaProps = {
      'aria-busy': isLoading || undefined,
      'aria-disabled': disabledState || undefined
    };

    const content = (
      <>
        {showSpinner && spinnerPlacement === 'start' && spinnerComponent}
        {showStartContent && <span className="lui-btn__start-content">{startContent}</span>}
        {!isIconOnly && children && <span className="lui-btn__content">{children}</span>}
        {isIconOnly && children}
        {showEndContent && <span className="lui-btn__end-content">{endContent}</span>}
        {showSpinner && spinnerPlacement === 'end' && spinnerComponent}
      </>
    );

    return (
      <Comp
        ref={ref}
        className={cls}
        disabled={Comp === 'button' ? disabledState : undefined}
        {...ariaProps}
        {...rest}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';
