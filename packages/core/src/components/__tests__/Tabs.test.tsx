import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab } from '../Tabs';

describe('Tabs', () => {
  describe('Rendering', () => {
    it('renders tabs and panels', () => {
      render(
        <Tabs>
          <Tab id="1" title="Tab 1">Content 1</Tab>
          <Tab id="2" title="Tab 2">Content 2</Tab>
        </Tabs>
      );
      expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
      expect(screen.getByRole('tabpanel', { hidden: false })).toBeInTheDocument();
    });

    it('renders tablist', () => {
      render(
        <Tabs>
          <Tab id="1" title="Tab 1">Content</Tab>
        </Tabs>
      );
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(
        <Tabs>
          <Tab id="1" title="Tab 1">Content</Tab>
        </Tabs>
      );
      const tabs = screen.getByRole('tablist').closest('.lui-tabs');
      expect(tabs).toHaveClass('lui-tabs');
      expect(tabs).toHaveClass('lui-tabs--top');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">Content 1</Tab>
          <Tab id="2" title="Tab 2">Content 2</Tab>
        </Tabs>
      );
      
      const tab1 = screen.getByRole('tab', { name: /tab 1/i });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      
      await user.click(screen.getByRole('tab', { name: /tab 2/i }));
      expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'true');
    });

    it('works as controlled component', () => {
      render(
        <Tabs selectedKey="1">
          <Tab id="1" title="Tab 1">Content 1</Tab>
          <Tab id="2" title="Tab 2">Content 2</Tab>
        </Tabs>
      );
      
      expect(screen.getByRole('tab', { name: /tab 1/i })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Interactions', () => {
    it('calls onSelectionChange when tab is clicked', async () => {
      const handleSelectionChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Tabs onSelectionChange={handleSelectionChange}>
          <Tab id="1" title="Tab 1">Content 1</Tab>
          <Tab id="2" title="Tab 2">Content 2</Tab>
        </Tabs>
      );
      
      await user.click(screen.getByRole('tab', { name: /tab 2/i }));
      expect(handleSelectionChange).toHaveBeenCalledWith('2');
    });

    it('shows correct panel content when tab is selected', async () => {
      const user = userEvent.setup();
      render(
        <Tabs>
          <Tab id="1" title="Tab 1">Content 1</Tab>
          <Tab id="2" title="Tab 2">Content 2</Tab>
        </Tabs>
      );
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /tab 2/i }));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    const variants = ['solid', 'bordered', 'light', 'underlined'] as const;
    
    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(
          <Tabs variant={variant}>
            <Tab id="1" title="Tab 1">Content</Tab>
          </Tabs>
        );
        const tab = screen.getByRole('tab');
        expect(tab).toHaveClass(`lui-tab--${variant}`);
      });
    });
  });

  describe('Placement', () => {
    const placements = ['top', 'bottom', 'start', 'end'] as const;
    
    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, () => {
        render(
          <Tabs placement={placement}>
            <Tab id="1" title="Tab 1">Content</Tab>
          </Tabs>
        );
        const tabs = screen.getByRole('tablist').closest('.lui-tabs');
        expect(tabs).toHaveClass(`lui-tabs--${placement}`);
      });
    });
  });

  describe('States', () => {
    it('disables all tabs when group is disabled', () => {
      render(
        <Tabs isDisabled>
          <Tab id="1" title="Tab 1">Content</Tab>
        </Tabs>
      );
      expect(screen.getByRole('tab')).toBeDisabled();
    });

    it('disables individual tab', () => {
      render(
        <Tabs>
          <Tab id="1" title="Tab 1" isDisabled>Content</Tab>
        </Tabs>
      );
      expect(screen.getByRole('tab')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Tabs defaultSelectedKey="1">
          <Tab id="1" title="Tab 1">Content</Tab>
        </Tabs>
      );
      const tab = screen.getByRole('tab');
      expect(tab).toHaveAttribute('aria-selected', 'true');
      expect(tab).toHaveAttribute('role', 'tab');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <Tabs ref={ref}>
          <Tab id="1" title="Tab 1">Content</Tab>
        </Tabs>
      );
      expect(ref).toHaveBeenCalled();
    });
  });
});


