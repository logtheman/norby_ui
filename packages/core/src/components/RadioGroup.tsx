import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Orientation = 'horizontal' | 'vertical';

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: Size;
  color?: Color;
  orientation?: Orientation;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface RadioProps {
  value: string;
  size?: Size;
  color?: Color;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const RadioGroupContext = React.createContext<{
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: Size;
  color: Color;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
}>({
  name: '',
  size: 'md',
  color: 'primary'
});

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: nameProp,
      value: valueProp,
      defaultValue,
      onChange,
      size = 'md',
      color = 'primary',
      orientation = 'vertical',
      isDisabled = false,
      isRequired = false,
      isReadOnly = false,
      isInvalid = false,
      label,
      description,
      errorMessage,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const name = nameProp || React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const controlled = valueProp !== undefined;
    const value = controlled ? valueProp : internalValue;

    const handleChange = (newValue: string) => {
      if (!controlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const contextValue = React.useMemo(
      () => ({
        name,
        value,
        onChange: handleChange,
        size,
        color,
        isDisabled,
        isRequired,
        isReadOnly,
        isInvalid
      }),
      [name, value, handleChange, size, color, isDisabled, isRequired, isReadOnly, isInvalid]
    );

    const cls = cx(
      'lui-radio-group',
      `lui-radio-group--${orientation}`,
      isInvalid && 'lui-radio-group--invalid',
      className
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div ref={ref} className={cls} role="radiogroup" {...props}>
          {label && (
            <div className="lui-radio-group__label">
              {label}
              {isRequired && <span className="lui-radio-group__required">*</span>}
            </div>
          )}
          <div className="lui-radio-group__wrapper">{children}</div>
          {description && !isInvalid && (
            <div className="lui-radio-group__description">{description}</div>
          )}
          {errorMessage && isInvalid && (
            <div className="lui-radio-group__error">{errorMessage}</div>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      size,
      color,
      isDisabled,
      isRequired,
      isReadOnly,
      isInvalid,
      description,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(RadioGroupContext);
    const finalSize = size || context.size;
    const finalColor = color || context.color;
    const finalDisabled = isDisabled ?? context.isDisabled ?? false;
    const finalRequired = isRequired ?? context.isRequired ?? false;
    const finalReadOnly = isReadOnly ?? context.isReadOnly ?? false;
    const finalInvalid = isInvalid ?? context.isInvalid ?? false;

    const isChecked = context.value === value;
    const inputId = React.useId();
    const descriptionId = description ? `${inputId}-description` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!finalReadOnly && !finalDisabled) {
        context.onChange?.(value);
      }
    };

    const cls = cx(
      'lui-radio',
      `lui-radio--${finalSize}`,
      `lui-radio--${finalColor}`,
      isChecked && 'lui-radio--checked',
      finalDisabled && 'lui-radio--disabled',
      finalReadOnly && 'lui-radio--readonly',
      finalInvalid && 'lui-radio--invalid',
      className
    );

    return (
      <label className={cls}>
        <input
          ref={ref}
          type="radio"
          name={context.name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={finalDisabled}
          readOnly={finalReadOnly}
          required={finalRequired}
          aria-invalid={finalInvalid || undefined}
          aria-describedby={descriptionId}
          className="lui-radio__input"
          {...props}
        />
        <span className="lui-radio__control" />
        {(children || description) && (
          <span className="lui-radio__label-wrapper">
            {children && <span className="lui-radio__label">{children}</span>}
            {description && (
              <span id={descriptionId} className="lui-radio__description">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);
Radio.displayName = 'Radio';


