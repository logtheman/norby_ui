import * as React from 'react';

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  x?: number | string;
  y?: number | string;
  className?: string;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ x, y, className, style, ...props }, ref) => {
    const spacerStyle: React.CSSProperties = {
      ...style,
      ...(x !== undefined && { width: typeof x === 'number' ? `${x}rem` : x }),
      ...(y !== undefined && { height: typeof y === 'number' ? `${y}rem` : y }),
    };

    return <div ref={ref} className={className} style={spacerStyle} {...props} />;
  }
);
Spacer.displayName = 'Spacer';
