import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  color?: Color;
  radius?: Radius;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  size?: Size;
  color?: Color;
  radius?: Radius;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const CheckboxGroupContext = React.createContext<{
  name: string;
  value: string[];
  onChange?: (checkboxValue: string, checked: boolean) => void;
  size: Size;
  color: Color;
  radius: Radius;
  isDisabled?: boolean;
  isRequired?: boolean;
}>({
  name: '',
  value: [],
  size: 'md',
  color: 'primary',
  radius: 'md'
});

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size,
      color,
      radius,
      isIndeterminate = false,
      isDisabled = false,
      disableAnimation = false,
      description,
      className,
      children,
      checked,
      defaultChecked,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(CheckboxGroupContext);
    const isInGroup = context.name !== '';
    const finalSize = size || context.size;
    const finalColor = color || context.color;
    const finalRadius = radius || context.radius;
    const finalDisabled = isDisabled ?? context.isDisabled ?? false;

    // If in group, use group's value; otherwise use local state
    // Convert value to string for group comparison (value can be string | number | readonly string[])
    const valueStr: string | undefined = value !== undefined ? String(value) as string : undefined;
    const groupChecked = isInGroup && valueStr !== undefined ? context.value.includes(valueStr) : undefined;
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);
    const controlled = checked !== undefined;
    const currentChecked = isInGroup && valueStr !== undefined 
      ? groupChecked 
      : (controlled ? checked : isChecked);

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isInGroup && valueStr !== undefined) {
        // In group, use group's onChange
        context.onChange?.(valueStr as string, e.target.checked);
      } else {
        // Standalone checkbox
        if (!controlled) {
          setIsChecked(e.target.checked);
        }
        onChange?.(e);
      }
    };

    const cls = cx(
      'lui-checkbox',
      `lui-checkbox--${finalSize}`,
      `lui-checkbox--${finalColor}`,
      `lui-checkbox--radius-${finalRadius}`,
      currentChecked && 'lui-checkbox--checked',
      isIndeterminate && 'lui-checkbox--indeterminate',
      finalDisabled && 'lui-checkbox--disabled',
      disableAnimation && 'lui-checkbox--no-animation',
      className
    );

    const checkboxId = React.useId();
    const descriptionId = description ? `${checkboxId}-description` : undefined;

    return (
      <label className={cls}>
        <input
          ref={inputRef}
          type="checkbox"
          checked={isInGroup && valueStr !== undefined ? groupChecked : (controlled ? checked : isChecked)}
          defaultChecked={!isInGroup ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={finalDisabled}
          aria-checked={isIndeterminate ? 'mixed' : currentChecked}
          aria-disabled={finalDisabled || undefined}
          aria-describedby={descriptionId}
          className="lui-checkbox__input"
          value={value}
          {...props}
        />
        <span className="lui-checkbox__control" />
        {(children || description) && (
          <span className="lui-checkbox__label-wrapper">
            {children && <span className="lui-checkbox__label">{children}</span>}
            {description && (
              <span id={descriptionId} className="lui-checkbox__description">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      size = 'md',
      color = 'primary',
      radius = 'md',
      orientation = 'vertical',
      isDisabled = false,
      isRequired = false,
      label,
      description,
      errorMessage,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const name = React.useId();
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || []);
    const controlled = valueProp !== undefined;
    const value = controlled ? valueProp : internalValue;

    const handleChange = React.useCallback((checkboxValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, checkboxValue]
        : value.filter((v) => v !== checkboxValue);
      if (!controlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [value, controlled, onChange]);

    const contextValue = React.useMemo(
      () => ({
        name,
        value,
        onChange: handleChange,
        size,
        color,
        radius,
        isDisabled,
        isRequired
      }),
      [name, value, handleChange, size, color, radius, isDisabled, isRequired]
    );

    const cls = cx(
      'lui-checkbox-group',
      `lui-checkbox-group--${orientation}`,
      errorMessage ? 'lui-checkbox-group--invalid' : false,
      className
    );

    const isInvalid = !!errorMessage;

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div ref={ref} className={cls} role="group" {...props}>
          {label && (
            <div className="lui-checkbox-group__label">
              {label}
              {isRequired && <span className="lui-checkbox-group__required">*</span>}
            </div>
          )}
          <div className="lui-checkbox-group__wrapper">{children}</div>
          {description && !isInvalid && (
            <div className="lui-checkbox-group__description">{description}</div>
          )}
          {errorMessage && isInvalid && (
            <div className="lui-checkbox-group__error">{errorMessage}</div>
          )}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

// Hook to use checkbox in group context
export const useCheckboxGroup = () => {
  const context = React.useContext(CheckboxGroupContext);
  return {
    ...context,
    isChecked: (value: string) => context.value.includes(value),
    toggle: (value: string) => {
      const checked = context.value.includes(value);
      context.onChange?.(value, !checked);
    }
  };
};


