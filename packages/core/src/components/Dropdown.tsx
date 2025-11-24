import * as React from 'react';
import { Popover, PopoverProps, PopoverTrigger, PopoverContent } from './Popover';

type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type SelectionMode = 'none' | 'single' | 'multiple';
type TriggerType = 'press' | 'longPress';

export interface DropdownProps extends Omit<PopoverProps, 'children'> {
  type?: 'menu' | 'listbox';
  trigger?: TriggerType;
  isDisabled?: boolean;
  closeOnSelect?: boolean;
  shouldBlockScroll?: boolean;
  children: [React.ReactElement, React.ReactElement];
}

export interface DropdownTriggerProps {
  children: React.ReactElement;
}

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'autoFocus'> {
  variant?: Variant;
  color?: Color;
  selectionMode?: SelectionMode;
  selectedKeys?: 'all' | Iterable<React.Key>;
  defaultSelectedKeys?: 'all' | Iterable<React.Key>;
  disabledKeys?: Iterable<React.Key>;
  disallowEmptySelection?: boolean;
  autoFocus?: boolean | 'first' | 'last';
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  emptyContent?: React.ReactNode;
  hideEmptyContent?: boolean;
  hideSelectedIcon?: boolean;
  shouldFocusWrap?: boolean;
  closeOnSelect?: boolean;
  disableAnimation?: boolean;
  onAction?: (key: React.Key) => void;
  onSelectionChange?: (
    keys: 'all' | Set<React.Key> & { anchorKey?: string; currentKey?: string }
  ) => void;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export interface DropdownSectionProps {
  title?: string;
  'aria-label'?: string;
  showDivider?: boolean;
  hideSelectedIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface DropdownItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick' | 'title'> {
  itemKey?: React.Key;
  title?: string | React.ReactNode;
  textValue?: string;
  description?: string | React.ReactNode;
  shortcut?: string | React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  selectedIcon?: React.ReactNode;
  showDivider?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean | string;
  ping?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  isDisabled?: boolean;
  isSelected?: boolean;
  isReadOnly?: boolean;
  hideSelectedIcon?: boolean;
  closeOnSelect?: boolean;
  onAction?: () => void;
  onClose?: () => void;
  onPress?: (e: React.PointerEvent<HTMLLIElement>) => void;
  onPressStart?: (e: React.PointerEvent<HTMLLIElement>) => void;
  onPressEnd?: (e: React.PointerEvent<HTMLLIElement>) => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: (e: React.PointerEvent<HTMLLIElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const DropdownContext = React.createContext<{
  variant: Variant;
  color: Color;
  selectionMode: SelectionMode;
  selectedKeys: Set<React.Key>;
  disabledKeys: Set<React.Key>;
  onSelectionChange?: (keys: Set<React.Key>) => void;
  onAction?: (key: React.Key) => void;
  onClose?: () => void;
  hideSelectedIcon: boolean;
  closeOnSelect: boolean;
}>({
  variant: 'solid',
  color: 'default',
  selectionMode: 'none',
  selectedKeys: new Set(),
  disabledKeys: new Set(),
  hideSelectedIcon: false,
  closeOnSelect: true
});

export const Dropdown: React.FC<DropdownProps> = ({
  type: _type = 'menu',
  trigger: _trigger = 'press',
  isDisabled: _isDisabled = false,
  closeOnSelect: _closeOnSelect = true,
  shouldBlockScroll: _shouldBlockScroll = true,
  children,
  placement = 'bottom-start',
  ...popoverProps
}) => {
  const [triggerElement, menuElement] = React.Children.toArray(children) as React.ReactElement[];

  return (
    <Popover {...popoverProps} placement={placement}>
      {triggerElement}
      {menuElement}
    </Popover>
  );
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children }) => {
  return <PopoverTrigger>{children}</PopoverTrigger>;
};

export const DropdownMenu = React.forwardRef<HTMLUListElement, DropdownMenuProps>(
  (
    {
      variant = 'solid',
      color = 'default',
      selectionMode = 'none',
      selectedKeys: selectedKeysProp,
      defaultSelectedKeys,
      disabledKeys,
      disallowEmptySelection = false,
      autoFocus: _autoFocus = false,
      topContent,
      bottomContent,
      emptyContent = 'No items.',
      hideEmptyContent = false,
      hideSelectedIcon = false,
      shouldFocusWrap: _shouldFocusWrap = false,
      closeOnSelect = true,
      disableAnimation = false,
      onAction,
      onSelectionChange,
      onClose,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<Set<React.Key>>(() => {
      if (defaultSelectedKeys) {
        if (defaultSelectedKeys === 'all') {
          return new Set<React.Key>();
        }
        return new Set<React.Key>(defaultSelectedKeys);
      }
      return new Set<React.Key>();
    });

    const controlled = selectedKeysProp !== undefined;
    const selectedKeys = React.useMemo(() => {
      if (controlled) {
        return selectedKeysProp === 'all' ? new Set<React.Key>() : new Set<React.Key>(selectedKeysProp);
      }
      return internalSelectedKeys;
    }, [controlled, selectedKeysProp, internalSelectedKeys]);

    const disabledKeysSet = React.useMemo(
      () => (disabledKeys ? new Set<React.Key>(disabledKeys) : new Set<React.Key>()),
      [disabledKeys]
    );

    const handleSelectionChange = React.useCallback(
      (newKeys: Set<React.Key>) => {
        if (!controlled) {
          setInternalSelectedKeys(newKeys);
        }
        onSelectionChange?.(newKeys as Set<React.Key>);
      },
      [controlled, onSelectionChange]
    );

    const handleItemClick = React.useCallback(
      (key: React.Key) => {
        if (disabledKeysSet.has(key)) return;

        if (selectionMode === 'single') {
          const newKeys = selectedKeys.has(key) && !disallowEmptySelection ? new Set<React.Key>() : new Set([key]);
          handleSelectionChange(newKeys);
        } else if (selectionMode === 'multiple') {
          const newKeys = new Set(selectedKeys);
          if (newKeys.has(key)) {
            if (!disallowEmptySelection || newKeys.size > 1) {
              newKeys.delete(key);
            }
          } else {
            newKeys.add(key);
          }
          handleSelectionChange(newKeys);
        }

        onAction?.(key);
        if (closeOnSelect && selectionMode === 'none') {
          onClose?.();
        }
      },
      [selectionMode, selectedKeys, disabledKeysSet, disallowEmptySelection, closeOnSelect, onAction, onClose, handleSelectionChange]
    );

    const contextValue = React.useMemo(
      () => ({
        variant,
        color,
        selectionMode,
        selectedKeys,
        disabledKeys: disabledKeysSet,
        onSelectionChange: handleSelectionChange,
        onAction: handleItemClick,
        onClose,
        hideSelectedIcon,
        closeOnSelect
      }),
      [variant, color, selectionMode, selectedKeys, disabledKeysSet, handleSelectionChange, handleItemClick, onClose, hideSelectedIcon, closeOnSelect]
    );

    const cls = cx(
      'lui-dropdown-menu',
      `lui-dropdown-menu--${variant}`,
      `lui-dropdown-menu--${color}`,
      disableAnimation && 'lui-dropdown-menu--no-animation',
      className
    );

    const hasItems = React.Children.count(children) > 0;

    return (
      <DropdownContext.Provider value={contextValue}>
        <PopoverContent>
          <div className="lui-dropdown-menu__wrapper">
            {topContent && <div className="lui-dropdown-menu__top-content">{topContent}</div>}
            {!hasItems && !hideEmptyContent && (
              <div className="lui-dropdown-menu__empty-content">{emptyContent}</div>
            )}
            <ul ref={ref} className={cls} role={selectionMode === 'none' ? 'menu' : 'listbox'} {...props}>
              {children}
            </ul>
            {bottomContent && <div className="lui-dropdown-menu__bottom-content">{bottomContent}</div>}
          </div>
        </PopoverContent>
      </DropdownContext.Provider>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  title,
  'aria-label': ariaLabel,
  showDivider = false,
  hideSelectedIcon: _hideSelectedIcon = false,
  className,
  children
}) => {
  const cls = cx('lui-dropdown-section', className);

  return (
    <div className={cls}>
      {title && (
        <div className="lui-dropdown-section__heading" role="heading" aria-level={3}>
          {title}
        </div>
      )}
      {showDivider && title && <div className="lui-dropdown-section__divider" />}
      <div className="lui-dropdown-section__group" role="group" aria-label={ariaLabel || title}>
        {children}
      </div>
    </div>
  );
};
DropdownSection.displayName = 'DropdownSection';

export const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  (
    {
      itemKey,
      title,
      textValue,
      description,
      shortcut,
      startContent,
      endContent,
      selectedIcon,
      showDivider = false,
      href,
      target,
      rel,
      download,
      ping,
      referrerPolicy,
      isDisabled: isDisabledProp,
      isSelected: isSelectedProp,
      isReadOnly = false,
      hideSelectedIcon: hideSelectedIconProp,
      closeOnSelect: closeOnSelectProp,
      onAction,
      onClose: _onClose,
      onClick,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const {
      variant,
      color,
      selectionMode,
      selectedKeys,
      disabledKeys,
      onAction: onContextAction,
      onClose: onContextClose,
      hideSelectedIcon: contextHideSelectedIcon,
      closeOnSelect: contextCloseOnSelect
    } = React.useContext(DropdownContext);

    const hideSelectedIcon = hideSelectedIconProp ?? contextHideSelectedIcon;
    const closeOnSelect = closeOnSelectProp ?? contextCloseOnSelect;
    const isDisabled = isDisabledProp || (itemKey ? disabledKeys.has(itemKey) : false);
    const isSelected = isSelectedProp ?? (itemKey ? selectedKeys.has(itemKey) : false);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (isDisabled || isReadOnly) return;

        if (itemKey) {
          onContextAction?.(itemKey);
        }
        onAction?.();
        onClick?.(e);

        if (closeOnSelect && selectionMode === 'none') {
          onContextClose?.();
        }
      },
      [isDisabled, isReadOnly, itemKey, onContextAction, onAction, onClick, closeOnSelect, selectionMode, onContextClose]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (isDisabled || isReadOnly) {
          props.onKeyDown?.(e);
          return;
        }

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          if (itemKey) {
            onContextAction?.(itemKey);
          }
          onAction?.();
          if (closeOnSelect && selectionMode === 'none') {
            onContextClose?.();
          }
        }
        props.onKeyDown?.(e);
      },
      [isDisabled, isReadOnly, itemKey, onContextAction, onAction, closeOnSelect, selectionMode, onContextClose, props]
    );

    const content = title || children;
    const displayText = textValue || (typeof content === 'string' ? content : undefined);

    const cls = cx(
      'lui-dropdown-item',
      `lui-dropdown-item--${variant}`,
      `lui-dropdown-item--${color}`,
      isDisabled && 'lui-dropdown-item--disabled',
      isSelected && 'lui-dropdown-item--selected',
      showDivider && 'lui-dropdown-item--divider',
      className
    );

    const itemContent = (
      <>
        {startContent && <span className="lui-dropdown-item__start-content">{startContent}</span>}
        <div className="lui-dropdown-item__wrapper">
          {content && <span className="lui-dropdown-item__title">{content}</span>}
          {description && <span className="lui-dropdown-item__description">{description}</span>}
        </div>
        {shortcut && <span className="lui-dropdown-item__shortcut">{shortcut}</span>}
        {isSelected && !hideSelectedIcon && (
          <span className="lui-dropdown-item__selected-icon">
            {selectedIcon || (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>
        )}
        {endContent && <span className="lui-dropdown-item__end-content">{endContent}</span>}
      </>
    );

    if (href) {
      return (
        <li
          ref={ref}
          className={cls}
          role="menuitem"
          aria-disabled={isDisabled ? 'true' : undefined}
          aria-selected={selectionMode !== 'none' ? (isSelected ? 'true' : 'false') : undefined}
          data-disabled={isDisabled ? 'true' : undefined}
          data-selected={isSelected ? 'true' : undefined}
          {...props}
        >
            <a
            href={href}
            target={target}
            rel={rel}
            download={download}
            ping={ping}
            referrerPolicy={referrerPolicy}
            className="lui-dropdown-item__link"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              handleClick(e as unknown as React.MouseEvent<HTMLLIElement>);
            }}
          >
            {itemContent}
          </a>
        </li>
      );
    }

    return (
      <li
        ref={ref}
        className={cls}
        role={selectionMode === 'none' ? 'menuitem' : 'option'}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-selected={selectionMode !== 'none' ? (isSelected ? 'true' : 'false') : undefined}
        aria-label={displayText}
        data-disabled={isDisabled || undefined}
        data-selected={isSelected || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        {...props}
      >
        {itemContent}
      </li>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';
