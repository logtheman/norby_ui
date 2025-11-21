import * as React from 'react';

type Orientation = 'horizontal' | 'vertical';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: Orientation;
  color?: Color;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', color = 'default', className, ...props }, ref) => {
    const cls = cx('lui-divider', `lui-divider--${orientation}`, `lui-divider--${color}`, className);

    return <hr ref={ref} className={cls} role="separator" aria-orientation={orientation} {...props} />;
  }
);
Divider.displayName = 'Divider';


