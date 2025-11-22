import * as React from 'react';

type Variant = 'solid' | 'bordered' | 'light' | 'underlined';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Placement = 'top' | 'bottom' | 'start' | 'end';

export interface TabsProps {
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelectionChange?: (key: string) => void;
  variant?: Variant;
  color?: Color;
  size?: Size;
  placement?: Placement;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface TabProps {
  id: string;
  title: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const TabsContext = React.createContext<{
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  variant: Variant;
  color: Color;
  size: Size;
  placement: Placement;
  isDisabled?: boolean;
}>({
  variant: 'solid',
  color: 'primary',
  size: 'md',
  placement: 'top'
});

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      selectedKey: selectedKeyProp,
      defaultSelectedKey,
      onSelectionChange,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      placement = 'top',
      isDisabled = false,
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const tabs: TabProps[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        tabs.push(child.props as TabProps);
      }
    });

    const [internalSelectedKey, setInternalSelectedKey] = React.useState(
      defaultSelectedKey || tabs[0]?.id || ''
    );
    const controlled = selectedKeyProp !== undefined;
    const selectedKey = controlled ? selectedKeyProp : internalSelectedKey;

    const handleSelectionChange = React.useCallback(
      (key: string) => {
        if (!controlled) {
          setInternalSelectedKey(key);
        }
        onSelectionChange?.(key);
      },
      [controlled, onSelectionChange]
    );

    const contextValue = React.useMemo(
      () => ({
        selectedKey,
        onSelectionChange: handleSelectionChange,
        variant,
        color,
        size,
        placement,
        isDisabled
      }),
      [selectedKey, handleSelectionChange, variant, color, size, placement, isDisabled]
    );

    const isVertical = placement === 'start' || placement === 'end';
    const cls = cx(
      'lui-tabs',
      `lui-tabs--${placement}`,
      isVertical && 'lui-tabs--vertical',
      disableAnimation && 'lui-tabs--no-animation',
      className
    );

    const panels: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        panels.push(child.props.children);
      }
    });

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cls} {...props}>
          <div className="lui-tabs__list" role="tablist">
            {tabs.map((tab, index) => (
              <TabButton key={tab.id} tab={tab} isSelected={selectedKey === tab.id} index={index} />
            ))}
          </div>
          <div className="lui-tabs__panels">
            {panels.map((panel, index) => (
              <div
                key={tabs[index].id}
                className={cx(
                  'lui-tabs__panel',
                  selectedKey === tabs[index].id && 'lui-tabs__panel--active'
                )}
                role="tabpanel"
                aria-hidden={selectedKey !== tabs[index].id}
                hidden={selectedKey !== tabs[index].id}
              >
                {panel}
              </div>
            ))}
          </div>
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabButton = ({
  tab,
  isSelected,
  index: _index
}: {
  tab: TabProps;
  isSelected: boolean;
  index: number;
}) => {
  const context = React.useContext(TabsContext);
  const { variant, color, size, isDisabled, onSelectionChange } = context;

  const handleClick = () => {
    if (!isDisabled && !tab.isDisabled) {
      onSelectionChange?.(tab.id);
    }
  };

  const cls = cx(
    'lui-tab',
    `lui-tab--${variant}`,
    `lui-tab--${color}`,
    `lui-tab--${size}`,
    isSelected && 'lui-tab--selected',
    (isDisabled || tab.isDisabled) && 'lui-tab--disabled',
    tab.className
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected ? 'true' : 'false'}
      aria-controls={`tabpanel-${tab.id}`}
      id={`tab-${tab.id}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      disabled={isDisabled || tab.isDisabled}
      className={cls}
    >
      {tab.title}
    </button>
  );
};

export const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};
Tab.displayName = 'Tab';
