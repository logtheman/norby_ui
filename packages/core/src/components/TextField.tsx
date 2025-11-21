import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isClearable?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      description,
      errorMessage,
      variant = 'bordered',
      color = 'default',
      size = 'md',
      radius = 'lg',
      startContent,
      endContent,
      isClearable = false,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      isInvalid = false,
      value,
      defaultValue,
      onChange,
      onValueChange,
      onClear,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const controlledValue = value !== undefined ? value : internalValue;
    const hasValue = controlledValue !== '';

    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
      onValueChange?.(newValue);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onValueChange?.('');
      onClear?.();
    };

    const showClearButton = isClearable && hasValue && !isDisabled && !isReadOnly;

    const invalid = isInvalid || !!errorMessage;

    const baseClasses = cx('lui-input', className);
    const wrapperClasses = cx(
      'lui-input__wrapper',
      `lui-input__wrapper--${variant}`,
      `lui-input__wrapper--${color}`,
      `lui-input__wrapper--${size}`,
      `lui-input__wrapper--radius-${radius}`,
      isDisabled && 'lui-input__wrapper--disabled',
      isReadOnly && 'lui-input__wrapper--readonly',
      invalid && 'lui-input__wrapper--invalid'
    );

    return (
      <div className={baseClasses}>
        {label && (
          <label htmlFor={inputId} className="lui-input__label">
            {label}
            {isRequired && <span className="lui-input__required">*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {startContent && <span className="lui-input__start-content">{startContent}</span>}
          <input
            ref={ref}
            id={inputId}
            value={controlledValue}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={isRequired || undefined}
            aria-readonly={isReadOnly || undefined}
            aria-disabled={isDisabled || undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            className="lui-input__input"
            {...props}
          />
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="lui-input__clear-button"
              aria-label="Clear input"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          {endContent && <span className="lui-input__end-content">{endContent}</span>}
        </div>
        {(description || errorMessage) && (
          <div className="lui-input__helper-wrapper">
            {description && !invalid && (
              <div id={descriptionId} className="lui-input__description">
                {description}
              </div>
            )}
            {errorMessage && invalid && (
              <div id={errorId} className="lui-input__error">
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';
