import * as React from 'react';

type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: Radius;
  isLoaded?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ radius = 'md', isLoaded = false, disableAnimation = false, className, children, ...props }, ref) => {
    const cls = cx(
      'lui-skeleton',
      `lui-skeleton--radius-${radius}`,
      isLoaded && 'lui-skeleton--loaded',
      disableAnimation && 'lui-skeleton--no-animation',
      className
    );

    if (isLoaded) {
      return (
        <div ref={ref} className={cls} {...props}>
          {children}
        </div>
      );
    }

    return <div ref={ref} className={cls} aria-busy="true" aria-live="polite" {...props} />;
  }
);
Skeleton.displayName = 'Skeleton';
