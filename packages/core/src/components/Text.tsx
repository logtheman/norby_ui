import * as React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div';
type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'muted'
  | 'subtle';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps {
  as?: HeadingLevel;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: Color;
  weight?: Weight;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as, size, color = 'default', weight, className, children, ...props }, ref) => {
    const Component = (as || 'p') as React.ElementType;
    const sizeClass = size ? `lui-text--${size}` : undefined;
    const colorClass = `lui-text--color-${color}`;
    const weightClass = weight ? `lui-text--weight-${weight}` : undefined;

    const cls = cx('lui-text', sizeClass, colorClass, weightClass, className);

    return (
      <Component ref={ref} className={cls} {...props}>
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

// Convenience components
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text as="h1" ref={ref} {...props} />
));
H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text as="h2" ref={ref} {...props} />
));
H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text as="h3" ref={ref} {...props} />
));
H3.displayName = 'H3';

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text as="h4" ref={ref} {...props} />
));
H4.displayName = 'H4';

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text as="h5" ref={ref} {...props} />
));
H5.displayName = 'H5';
