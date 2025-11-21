import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '../Drawer';

describe('Drawer', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('does not render when closed', () => {
      render(
        <Drawer isOpen={false}>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when open', () => {
      render(
        <Drawer isOpen>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('works as controlled component', () => {
      // Test controlled component by rendering it open first, then closed
      const { rerender } = render(
        <Drawer isOpen={true}>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      rerender(
        <Drawer isOpen={false}>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onOpenChange when backdrop is clicked', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Drawer isOpen isDismissable onOpenChange={handleOpenChange}>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      
      const backdrop = document.querySelector('.lui-drawer__backdrop');
      await user.click(backdrop!);
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('closes when Escape key is pressed', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Drawer isOpen isDismissable onOpenChange={handleOpenChange}>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      
      await user.keyboard('{Escape}');
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Placement', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;
    
    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, () => {
        render(
          <Drawer isOpen placement={placement}>
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        );
        const wrapper = document.querySelector('.lui-drawer__wrapper');
        expect(wrapper).toHaveClass(`lui-drawer__wrapper--${placement}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <Drawer isOpen size={size}>
            <DrawerContent>Content</DrawerContent>
          </Drawer>
        );
        const drawer = screen.getByRole('dialog');
        expect(drawer).toHaveClass(`lui-drawer--${size}`);
      });
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when open', () => {
      render(
        <Drawer isOpen>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});

describe('DrawerContent', () => {
  it('renders children', () => {
    render(
      <Drawer isOpen>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has close button', () => {
    render(
      <Drawer isOpen>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });
});

describe('DrawerHeader', () => {
  it('renders children', () => {
    render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerHeader>Header</DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('DrawerBody', () => {
  it('renders children', () => {
    render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerBody>Body</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});

describe('DrawerFooter', () => {
  it('renders children', () => {
    render(
      <Drawer isOpen>
        <DrawerContent>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

