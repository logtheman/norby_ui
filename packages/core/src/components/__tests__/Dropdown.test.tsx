import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection
} from '../Dropdown';

describe('Dropdown', () => {
  describe('Rendering', () => {
    it('renders dropdown with trigger and menu', () => {
      render(
        <Dropdown>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('opens dropdown when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen={false}>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const trigger = screen.getByText('Open');
      await user.click(trigger);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('DropdownMenu', () => {
    it('renders menu with items', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container, rerender } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu variant="solid">
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      let menu = container.querySelector('.lui-dropdown-menu');
      expect(menu).toHaveClass('lui-dropdown-menu--solid');

      rerender(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu variant="bordered">
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      menu = container.querySelector('.lui-dropdown-menu');
      expect(menu).toHaveClass('lui-dropdown-menu--bordered');
    });

    it('applies color classes', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu color="primary">
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item = container.querySelector('.lui-dropdown-item');
      expect(item).toHaveClass('lui-dropdown-item--primary');
    });

    it('shows empty content when no items', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu emptyContent="No items found">
            {/* No items */}
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
    });

    it('hides empty content when hideEmptyContent is true', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu hideEmptyContent emptyContent="No items">
            {/* No items */}
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.queryByText('No items')).not.toBeInTheDocument();
    });

    it('renders topContent and bottomContent', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu topContent={<div>Top</div>} bottomContent={<div>Bottom</div>}>
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Top')).toBeInTheDocument();
      expect(screen.getByText('Bottom')).toBeInTheDocument();
    });
  });

  describe('DropdownItem', () => {
    it('renders item with title', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1" title="Item 1" />
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('renders item with children', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('renders item with description', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1" title="Item" description="Description" />
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Item')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('renders item with shortcut', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1" title="Item" shortcut="Ctrl+K" />
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Item')).toBeInTheDocument();
      expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
    });

    it('renders item with startContent and endContent', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1" startContent={<span>Start</span>} endContent={<span>End</span>}>
              Item
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Start')).toBeInTheDocument();
      expect(screen.getByText('End')).toBeInTheDocument();
    });

    it('calls onAction when clicked', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      await user.click(screen.getByText('Item 1'));
      expect(handleAction).toHaveBeenCalledWith('1');
    });

    it('does not call onAction when disabled', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            <DropdownItem itemKey="1" isDisabled>
              Item 1
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item = screen.getByText('Item 1').closest('li');
      expect(item).toHaveAttribute('aria-disabled', 'true');
      if (item) {
        await user.click(item);
      }
      expect(handleAction).not.toHaveBeenCalled();
    });

    it('renders as link when href is provided', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1" href="/link">
              Link Item
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/link');
    });
  });

  describe('Selection', () => {
    it('supports single selection', async () => {
      const handleSelectionChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            onSelectionChange={handleSelectionChange}
            defaultSelectedKeys={['1']}
          >
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item1 = screen.getByText('Item 1').closest('li');
      expect(item1).toHaveAttribute('aria-selected', 'true');

      await user.click(screen.getByText('Item 2'));
      expect(handleSelectionChange).toHaveBeenCalled();
    });

    it('supports multiple selection', async () => {
      const handleSelectionChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="multiple" onSelectionChange={handleSelectionChange}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      await user.click(screen.getByText('Item 1'));
      await user.click(screen.getByText('Item 2'));

      expect(handleSelectionChange).toHaveBeenCalledTimes(2);
    });

    it('shows selected icon when item is selected', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="single" defaultSelectedKeys={['1']}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const selectedIcon = container.querySelector('.lui-dropdown-item__selected-icon');
      expect(selectedIcon).toBeInTheDocument();
    });

    it('hides selected icon when hideSelectedIcon is true', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="single" defaultSelectedKeys={['1']} hideSelectedIcon>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const selectedIcon = container.querySelector('.lui-dropdown-item__selected-icon');
      expect(selectedIcon).not.toBeInTheDocument();
    });
  });

  describe('DropdownSection', () => {
    it('renders section with title', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="Section 1">
              <DropdownItem itemKey="1">Item 1</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      );

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('renders divider when showDivider is true', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="Section 1" showDivider>
              <DropdownItem itemKey="1">Item 1</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      );

      const divider = container.querySelector('.lui-dropdown-section__divider');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Disabled Keys', () => {
    it('disables items by key', () => {
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu disabledKeys={['2']}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
            <DropdownItem itemKey="2">Item 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item2 = screen.getByText('Item 2').closest('li');
      expect(item2).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter key', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item = screen.getByText('Item 1').closest('li');
      if (item) {
        (item as HTMLElement).focus();
        await user.keyboard('{Enter}');
      }
      expect(handleAction).toHaveBeenCalled();
    });

    it('handles Space key', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            <DropdownItem itemKey="1">Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const item = screen.getByText('Item 1').closest('li');
      if (item) {
        (item as HTMLElement).focus();
        await user.keyboard(' ');
      }
      expect(handleAction).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct role for menu', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const menu = container.querySelector('ul[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    it('has correct role for listbox when selectionMode is set', () => {
      const { container } = render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="single">
            <DropdownItem itemKey="1">Item</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      const menu = container.querySelector('ul[role="listbox"]');
      expect(menu).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Dropdown defaultOpen>
          <DropdownTrigger>
            <Button>Open</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem ref={ref} itemKey="1">
              Item
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );

      expect(ref).toHaveBeenCalled();
    });
  });
});
