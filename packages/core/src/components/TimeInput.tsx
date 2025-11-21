import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
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
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const invalid = isInvalid || !!errorMessage;

    const wrapperClasses = cx(
      'lui-time-input__wrapper',
      `lui-time-input__wrapper--${variant}`,
      `lui-time-input__wrapper--${color}`,
      `lui-time-input__wrapper--${size}`,
      `lui-time-input__wrapper--radius-${radius}`,
      isDisabled && 'lui-time-input__wrapper--disabled',
      invalid && 'lui-time-input__wrapper--invalid'
    );

    return (
      <div className={cx('lui-time-input', className)}>
        {label && (
          <label htmlFor={inputId} className="lui-time-input__label">
            {label}
            {isRequired && <span className="lui-time-input__required">*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {startContent && (
            <span className="lui-time-input__start-content">{startContent}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            type="time"
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={isRequired || undefined}
            disabled={isDisabled}
            className="lui-time-input__input"
            {...props}
          />
        </div>
        {description && !invalid && (
          <div id={descriptionId} className="lui-time-input__description">
            {description}
          </div>
        )}
        {errorMessage && invalid && (
          <div id={errorId} className="lui-time-input__error">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
TimeInput.displayName = 'TimeInput';


