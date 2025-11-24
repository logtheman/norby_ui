import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
  keys?: string | string[];
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ size = 'md', keys, className, children, ...props }, ref) => {
    const cls = cx('lui-kbd', `lui-kbd--${size}`, className);

    const keysArray = keys ? (Array.isArray(keys) ? keys : [keys]) : undefined;

    return (
      <kbd ref={ref} className={cls} {...props}>
        {keysArray ? (
          <>
            {keysArray.map((key, index) => (
              <React.Fragment key={index}>
                <span className="lui-kbd__key">{key}</span>
                {index < keysArray.length - 1 && <span className="lui-kbd__separator">+</span>}
              </React.Fragment>
            ))}
          </>
        ) : (
          children
        )}
      </kbd>
    );
  }
);
Kbd.displayName = 'Kbd';
