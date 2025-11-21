import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';
type Color = 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Underline = 'none' | 'hover' | 'always' | 'active' | 'focus';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: Size;
  color?: Color;
  underline?: Underline;
  isExternal?: boolean;
  showAnchorIcon?: boolean;
  anchorIcon?: React.ReactNode;
  isBlock?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const DefaultAnchorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      size = 'md',
      color = 'primary',
      underline = 'none',
      isExternal = false,
      showAnchorIcon = false,
      anchorIcon,
      isBlock = false,
      isDisabled = false,
      disableAnimation = false,
      className,
      href,
      target,
      rel,
      children,
      ...props
    },
    ref
  ) => {
    const externalProps = isExternal
      ? {
          target: target || '_blank',
          rel: rel || 'noopener noreferrer'
        }
      : { target, rel };

    const cls = cx(
      'lui-link',
      `lui-link--${size}`,
      `lui-link--${color}`,
      `lui-link--underline-${underline}`,
      isBlock && 'lui-link--block',
      isDisabled && 'lui-link--disabled',
      disableAnimation && 'lui-link--no-animation',
      className
    );

    const icon = anchorIcon || <DefaultAnchorIcon />;

    return (
      <a
        ref={ref}
        href={isDisabled ? undefined : href}
        className={cls}
        aria-disabled={isDisabled || undefined}
        {...externalProps}
        {...props}
      >
        {children}
        {showAnchorIcon && <span className="lui-link__anchor-icon">{icon}</span>}
      </a>
    );
  }
);
Link.displayName = 'Link';


