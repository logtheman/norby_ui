import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  startContent?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = 'bordered',
      color = 'default',
      size = 'md',
      radius = 'lg',
      label,
      description,
      errorMessage,
      placeholder,
      startContent,
      isRequired = false,
      isDisabled = false,
      isInvalid = false,
      className,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? React.useId();
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = errorMessage ? `${selectId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const invalid = isInvalid || !!errorMessage;

    const wrapperClasses = cx(
      'lui-select__wrapper',
      `lui-select__wrapper--${variant}`,
      `lui-select__wrapper--${color}`,
      `lui-select__wrapper--${size}`,
      `lui-select__wrapper--radius-${radius}`,
      isDisabled && 'lui-select__wrapper--disabled',
      invalid && 'lui-select__wrapper--invalid'
    );

    return (
      <div className={cx('lui-select', className)}>
        {label && (
          <label htmlFor={selectId} className="lui-select__label">
            {label}
            {isRequired && <span className="lui-select__required">*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {startContent && (
            <span className="lui-select__start-content">{startContent}</span>
          )}
          <select
            ref={ref}
            id={selectId}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={isRequired || undefined}
            disabled={isDisabled}
            className="lui-select__select"
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <span className="lui-select__end-content">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {description && !invalid && (
          <div id={descriptionId} className="lui-select__description">
            {description}
          </div>
        )}
        {errorMessage && invalid && (
          <div id={errorId} className="lui-select__error">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';


