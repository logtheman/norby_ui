import * as React from 'react';

type Placement = 'top' | 'bottom' | 'left' | 'right';
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  placement?: Placement;
  size?: Size;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  backdrop?: 'transparent' | 'opaque' | 'blur';
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const DrawerContext = React.createContext<{
  onClose: () => void;
  placement: Placement;
  size: Size;
}>({
  onClose: () => {},
  placement: 'right',
  size: 'md'
});

export const Drawer: React.FC<DrawerProps> = ({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  placement = 'right',
  size = 'md',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  backdrop = 'opaque',
  disableAnimation = false,
  className,
  children
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const controlled = isOpenProp !== undefined;
  const isOpen = controlled ? isOpenProp : internalOpen;

  const handleClose = React.useCallback(() => {
    if (!controlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [controlled, onOpenChange]);

  React.useEffect(() => {
    if (isOpen && !isKeyboardDismissDisabled) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isDismissable) {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isDismissable, isKeyboardDismissDisabled, handleClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const contextValue = React.useMemo(
    () => ({
      onClose: handleClose,
      placement,
      size
    }),
    [handleClose, placement, size]
  );

  if (!isOpen) return null;

  const backdropCls = cx(
    'lui-drawer__backdrop',
    `lui-drawer__backdrop--${backdrop}`,
    disableAnimation && 'lui-drawer__backdrop--no-animation'
  );

  const wrapperCls = cx(
    'lui-drawer__wrapper',
    `lui-drawer__wrapper--${placement}`,
    disableAnimation && 'lui-drawer__wrapper--no-animation',
    className
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      <div className={backdropCls} onClick={isDismissable ? handleClose : undefined}>
        <div className={wrapperCls} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  );
};

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => {
    const { placement, size, onClose } = React.useContext(DrawerContext);

    const cls = cx('lui-drawer', `lui-drawer--${placement}`, `lui-drawer--${size}`, className);

    return (
      <div ref={ref} className={cls} role="dialog" aria-modal="true" {...props}>
        <button
          type="button"
          className="lui-drawer__close-button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    );
  }
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-drawer__header', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-drawer__body', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
DrawerBody.displayName = 'DrawerBody';

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-drawer__footer', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
DrawerFooter.displayName = 'DrawerFooter';
