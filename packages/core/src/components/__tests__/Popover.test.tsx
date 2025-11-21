import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { Button } from '../Button';

describe('Popover', () => {
  describe('Rendering', () => {
    it('does not render content when closed', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('renders content when open', () => {
      render(
        <Popover isOpen>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      await user.click(screen.getByRole('button', { name: /trigger/i }));
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('works as controlled component', () => {
      const { rerender } = render(
        <Popover isOpen={false}>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      
      rerender(
        <Popover isOpen={true}>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('toggles popover when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      const trigger = screen.getByRole('button', { name: /trigger/i });
      await user.click(trigger);
      expect(screen.getByText('Content')).toBeInTheDocument();
      
      await user.click(trigger);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('calls onOpenChange when trigger is clicked', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      await user.click(screen.getByRole('button', { name: /trigger/i }));
      expect(handleOpenChange).toHaveBeenCalled();
    });

    it('closes when Escape key is pressed', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Popover isOpen isDismissable onOpenChange={handleOpenChange}>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      await user.keyboard('{Escape}');
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Placement', () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'] as const;
    
    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, () => {
        render(
          <Popover isOpen placement={placement}>
            <PopoverTrigger>
              <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        );
        // Placement affects positioning logic
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('sets aria-expanded on trigger', async () => {
      const user = userEvent.setup();
      render(
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      const trigger = screen.getByRole('button', { name: /trigger/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-haspopup on trigger', () => {
      render(
        <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );
      
      const trigger = screen.getByRole('button', { name: /trigger/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    });
  });
});

describe('PopoverContent', () => {
  it('renders children', () => {
    render(
      <Popover isOpen>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has role="dialog"', () => {
    render(
      <Popover isOpen>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});


