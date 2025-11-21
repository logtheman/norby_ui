import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size;
  radius?: Radius;
  isBordered?: boolean;
  isDisabled?: boolean;
  fallback?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      radius = 'full',
      isBordered = false,
      isDisabled = false,
      fallback,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const showFallback = !src || imgError;

    const cls = cx(
      'lui-avatar',
      `lui-avatar--${size}`,
      `lui-avatar--radius-${radius}`,
      isBordered && 'lui-avatar--bordered',
      isDisabled && 'lui-avatar--disabled',
      className
    );

    const fallbackContent = fallback || (name ? getInitials(name) : '?');

    return (
      <div ref={ref} className={cls} role="img" aria-label={alt || name} {...props}>
        {showFallback ? (
          <div className="lui-avatar__fallback">{fallbackContent}</div>
        ) : (
          <img
            src={src}
            alt={alt || name}
            className="lui-avatar__image"
            onError={() => setImgError(true)}
          />
        )}
        {children && <div className="lui-avatar__content">{children}</div>}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';


