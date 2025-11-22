import * as React from 'react';

type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: Placement;
  color?: Color;
  radius?: Radius;
  isDisabled?: boolean;
  delay?: number;
  closeDelay?: number;
  disableAnimation?: boolean;
  className?: string;
  children: React.ReactElement;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  color = 'default',
  radius = 'md',
  isDisabled = false,
  delay = 0,
  closeDelay = 0,
  disableAnimation = false,
  className,
  children
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    const [position, align] = placement.split('-') as [string, string?];

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + scrollX + 8;
        break;
    }

    if (align === 'start') {
      if (position === 'top' || position === 'bottom') {
        left = triggerRect.left + scrollX;
      } else {
        top = triggerRect.top + scrollY;
      }
    } else if (align === 'end') {
      if (position === 'top' || position === 'bottom') {
        left = triggerRect.right + scrollX - tooltipRect.width;
      } else {
        top = triggerRect.bottom + scrollY - tooltipRect.height;
      }
    }

    // Keep tooltip within viewport
    const padding = 8;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
    top = Math.max(
      padding,
      Math.min(top, window.innerHeight + scrollY - tooltipRect.height - padding)
    );

    setPosition({ top, left });
  }, [placement]);

  const showTooltip = React.useCallback(() => {
    if (isDisabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [isDisabled, delay]);

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  React.useEffect(() => {
    if (isOpen && tooltipRef.current) {
      // Use setTimeout to ensure DOM is updated and tooltip has dimensions
      const positionTimeout = setTimeout(() => {
        if (tooltipRef.current) {
          const rect = tooltipRef.current.getBoundingClientRect();
          // Only update position if tooltip has dimensions (is rendered)
          if (rect.width > 0 || rect.height > 0) {
            updatePosition();
          } else {
            // Retry if tooltip doesn't have dimensions yet
            requestAnimationFrame(() => {
              updatePosition();
            });
          }
        }
      }, 0);

      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(positionTimeout);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, updatePosition]);

  // Create ref callback that merges with existing ref
  const refCallback = React.useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node;
      // Forward ref to child if it has one
      if (children && typeof children === 'object' && 'ref' in children) {
        const childRef = (children as any).ref;
        if (typeof childRef === 'function') {
          childRef(node);
        } else if (childRef) {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      }
    },
    [children]
  );

  // Attach event handlers directly to DOM element for better compatibility with tests
  React.useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const handleMouseEnter = () => showTooltip();
    const handleMouseLeave = () => hideTooltip();
    const handleFocus = () => showTooltip();
    const handleBlur = () => hideTooltip();

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [showTooltip, hideTooltip]);

  // Merge event handlers with existing ones for React synthetic events
  const trigger = React.cloneElement(children, {
    ref: refCallback,
    onMouseEnter: (e: React.MouseEvent) => {
      (children.props as any).onMouseEnter?.(e);
      showTooltip();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (children.props as any).onMouseLeave?.(e);
      hideTooltip();
    },
    onFocus: (e: React.FocusEvent) => {
      (children.props as any).onFocus?.(e);
      showTooltip();
    },
    onBlur: (e: React.FocusEvent) => {
      (children.props as any).onBlur?.(e);
      hideTooltip();
    }
  });

  const cls = cx(
    'lui-tooltip',
    `lui-tooltip--${placement.split('-')[0]}`,
    `lui-tooltip--${color}`,
    `lui-tooltip--radius-${radius}`,
    disableAnimation && 'lui-tooltip--no-animation',
    className
  );

  return (
    <>
      {trigger}
      {isOpen && (
        <div
          ref={tooltipRef}
          className={cls}
          role="tooltip"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
