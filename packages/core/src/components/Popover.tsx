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
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface PopoverProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  placement?: Placement;
  radius?: Radius;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  backdrop?: 'transparent' | 'opaque';
  disableAnimation?: boolean;
  className?: string;
  children: [React.ReactElement, React.ReactElement];
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const PopoverContext = React.createContext<{
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  placement: Placement;
  radius: Radius;
}>({
  isOpen: false,
  onOpenChange: () => {},
  placement: 'bottom',
  radius: 'lg'
});

export const Popover: React.FC<PopoverProps> = ({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  radius = 'lg',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  backdrop,
  disableAnimation = false,
  className,
  children
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const controlled = isOpenProp !== undefined;
  const isOpen = controlled ? isOpenProp : internalOpen;

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!controlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [controlled, onOpenChange]
  );

  React.useEffect(() => {
    if (isOpen && !isKeyboardDismissDisabled) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isDismissable) {
          handleOpenChange(false);
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isDismissable, isKeyboardDismissDisabled, handleOpenChange]);

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      onOpenChange: handleOpenChange,
      placement,
      radius
    }),
    [isOpen, handleOpenChange, placement, radius]
  );

  const [trigger, content] = React.Children.toArray(children) as React.ReactElement[];

  return (
    <PopoverContext.Provider value={contextValue}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      {isOpen && backdrop && (
        <div
          className={cx(
            'lui-popover__backdrop',
            `lui-popover__backdrop--${backdrop}`,
            disableAnimation && 'lui-popover__backdrop--no-animation'
          )}
          onClick={isDismissable ? () => handleOpenChange(false) : undefined}
        />
      )}
      {isOpen && <PopoverContent className={className}>{content}</PopoverContent>}
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  const { isOpen, onOpenChange } = React.useContext(PopoverContext);

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      onOpenChange(!isOpen);
      children.props.onClick?.(e);
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'true'
  });
};

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, ...props }, ref) => {
    const { placement, radius, isOpen } = React.useContext(PopoverContext);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLElement | null>(null);

    const updatePosition = React.useCallback(() => {
      // Find trigger element
      const trigger = document.querySelector('[aria-expanded="true"][aria-haspopup="true"]');
      if (!trigger || !contentRef.current) return;

      triggerRef.current = trigger as HTMLElement;
      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      const [pos, align] = placement.split('-') as [string, string?];

      switch (pos) {
        case 'top':
          top = triggerRect.top + scrollY - contentRect.height - 8;
          left = triggerRect.left + scrollX + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 8;
          left = triggerRect.left + scrollX + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + scrollY + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.left + scrollX - contentRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + scrollY + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.right + scrollX + 8;
          break;
      }

      if (align === 'start') {
        if (pos === 'top' || pos === 'bottom') {
          left = triggerRect.left + scrollX;
        } else {
          top = triggerRect.top + scrollY;
        }
      } else if (align === 'end') {
        if (pos === 'top' || pos === 'bottom') {
          left = triggerRect.right + scrollX - contentRect.width;
        } else {
          top = triggerRect.bottom + scrollY - contentRect.height;
        }
      }

      const padding = 8;
      left = Math.max(padding, Math.min(left, window.innerWidth - contentRect.width - padding));
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight + scrollY - contentRect.height - padding)
      );

      setPosition({ top, left });
    }, [placement]);

    React.useEffect(() => {
      if (!isOpen) return;

      // Use double requestAnimationFrame to ensure DOM is fully updated and layout is complete
      let rafId: number;
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          updatePosition();
        });
      });

      // Also update on window resize/scroll
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [isOpen, updatePosition]);

    const cls = cx('lui-popover', `lui-popover--radius-${radius}`, className);

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && node) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cls}
        role="dialog"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';
