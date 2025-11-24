import * as React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'foreground';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: Size;
  color?: Color;
  className?: string;
}

const sizeMap: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

const colorMap: Record<Color, string> = {
  default: 'var(--color-default)',
  primary: 'var(--color-brand)',
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
  foreground: 'var(--color-fg)'
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', color = 'foreground', className, children, ...props }, ref) => {
    const iconSize = sizeMap[size];
    const iconColor = colorMap[color];

    return (
      <svg
        ref={ref}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ color: iconColor, ...props.style }}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
