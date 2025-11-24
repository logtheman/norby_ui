import * as React from 'react';

type Variant = 'flat' | 'bordered' | 'faded' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  minRows?: number;
  maxRows?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      isInvalid = false,
      minRows = 3,
      maxRows,
      value,
      defaultValue,
      onChange,
      onValueChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const controlledValue = value !== undefined ? value : internalValue;

    const descriptionId = description ? `${textareaId}-description` : undefined;
    const errorId = errorMessage ? `${textareaId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
      onValueChange?.(newValue);
    };

    const invalid = isInvalid || !!errorMessage;

    const baseClasses = cx('lui-textarea', className);
    const wrapperClasses = cx(
      'lui-textarea__wrapper',
      `lui-textarea__wrapper--${variant}`,
      `lui-textarea__wrapper--${color}`,
      `lui-textarea__wrapper--${size}`,
      `lui-textarea__wrapper--radius-${radius}`,
      isDisabled && 'lui-textarea__wrapper--disabled',
      isReadOnly && 'lui-textarea__wrapper--readonly',
      invalid && 'lui-textarea__wrapper--invalid'
    );

    const textareaStyle: React.CSSProperties = {
      minHeight: `calc(${minRows} * 1.5em + var(--space-4))`,
      ...(maxRows && { maxHeight: `calc(${maxRows} * 1.5em + var(--space-4))` }),
      ...style,
    };

    return (
      <div className={baseClasses}>
        {label && (
          <label htmlFor={textareaId} className="lui-textarea__label">
            {label}
            {isRequired && <span className="lui-textarea__required">*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          <textarea
            ref={ref}
            id={textareaId}
            value={controlledValue}
            defaultValue={defaultValue}
            onChange={handleChange}
            rows={minRows}
            style={textareaStyle}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            aria-required={isRequired || undefined}
            aria-readonly={isReadOnly || undefined}
            aria-disabled={isDisabled || undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            className="lui-textarea__textarea"
            {...props}
          />
        </div>
        {(description || errorMessage) && (
          <div className="lui-textarea__helper-wrapper">
            {description && !invalid && (
              <div id={descriptionId} className="lui-textarea__description">
                {description}
              </div>
            )}
            {errorMessage && invalid && (
              <div id={errorId} className="lui-textarea__error">
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
