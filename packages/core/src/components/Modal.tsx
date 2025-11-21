import * as React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type Placement = 'center' | 'top' | 'bottom' | 'auto';

export interface ModalProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  size?: Size;
  radius?: Radius;
  placement?: Placement;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  hideCloseButton?: boolean;
  backdrop?: 'transparent' | 'opaque' | 'blur';
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const ModalContext = React.createContext<{
  onClose: () => void;
  size: Size;
  radius: Radius;
  hideCloseButton: boolean;
}>({
  onClose: () => {},
  size: 'md',
  radius: 'lg',
  hideCloseButton: false
});

export const Modal: React.FC<ModalProps> = ({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  size = 'md',
  radius = 'lg',
  placement = 'center',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  hideCloseButton = false,
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
      size,
      radius,
      hideCloseButton
    }),
    [handleClose, size, radius, hideCloseButton]
  );

  if (!isOpen) return null;

  const backdropCls = cx(
    'lui-modal__backdrop',
    `lui-modal__backdrop--${backdrop}`,
    disableAnimation && 'lui-modal__backdrop--no-animation'
  );

  const wrapperCls = cx(
    'lui-modal__wrapper',
    `lui-modal__wrapper--${placement}`,
    disableAnimation && 'lui-modal__wrapper--no-animation',
    className
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <div className={backdropCls} onClick={isDismissable ? handleClose : undefined}>
        <div className={wrapperCls} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => {
    const { size, radius, onClose, hideCloseButton } = React.useContext(ModalContext);

    const cls = cx(
      'lui-modal',
      `lui-modal--${size}`,
      `lui-modal--radius-${radius}`,
      className
    );

    return (
      <div ref={ref} className={cls} role="dialog" aria-modal="true" {...props}>
        {!hideCloseButton && (
          <button
            type="button"
            className="lui-modal__close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        {children}
      </div>
    );
  }
);
ModalContent.displayName = 'ModalContent';

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-modal__header', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
ModalHeader.displayName = 'ModalHeader';

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-modal__body', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
ModalBody.displayName = 'ModalBody';

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    const cls = cx('lui-modal__footer', className);
    return <div ref={ref} className={cls} {...props} />;
  }
);
ModalFooter.displayName = 'ModalFooter';


