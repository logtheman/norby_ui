import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '../Modal';

describe('Modal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('does not render when closed', () => {
      render(
        <Modal isOpen={false}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when open', () => {
      render(
        <Modal isOpen>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders modal content', () => {
      render(
        <Modal isOpen>
          <ModalContent>Modal Content</ModalContent>
        </Modal>
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', () => {
      render(
        <Modal defaultOpen>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('works as controlled component', () => {
      // Test controlled component by rendering it open first, then closed
      const { rerender } = render(
        <Modal isOpen={true}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      rerender(
        <Modal isOpen={false}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onOpenChange when backdrop is clicked', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen isDismissable onOpenChange={handleOpenChange}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      const backdrop = document.querySelector('.lui-modal__backdrop');
      await user.click(backdrop!);
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not close when backdrop is clicked and not dismissable', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen isDismissable={false} onOpenChange={handleOpenChange}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      const backdrop = document.querySelector('.lui-modal__backdrop');
      await user.click(backdrop!);
      expect(handleOpenChange).not.toHaveBeenCalled();
    });

    it('closes when Escape key is pressed', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen isDismissable onOpenChange={handleOpenChange}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      await user.keyboard('{Escape}');
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not close when Escape is pressed and keyboard dismiss is disabled', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen isKeyboardDismissDisabled onOpenChange={handleOpenChange}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      await user.keyboard('{Escape}');
      expect(handleOpenChange).not.toHaveBeenCalled();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when open', () => {
      render(
        <Modal isOpen>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when closed', () => {
      const { unmount } = render(
        <Modal isOpen>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
    
    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(
          <Modal isOpen size={size}>
            <ModalContent>Content</ModalContent>
          </Modal>
        );
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass(`lui-modal--${size}`);
      });
    });
  });

  describe('Placement', () => {
    const placements = ['center', 'top', 'bottom', 'auto'] as const;
    
    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, () => {
        render(
          <Modal isOpen placement={placement}>
            <ModalContent>Content</ModalContent>
          </Modal>
        );
        const wrapper = document.querySelector('.lui-modal__wrapper');
        expect(wrapper).toHaveClass(`lui-modal__wrapper--${placement}`);
      });
    });
  });

  describe('Close Button', () => {
    it('renders close button by default', () => {
      render(
        <Modal isOpen>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('hides close button when hideCloseButton is true', () => {
      render(
        <Modal isOpen hideCloseButton>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });

    it('closes modal when close button is clicked', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen onOpenChange={handleOpenChange}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );
      
      await user.click(screen.getByLabelText('Close'));
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });
});

describe('ModalContent', () => {
  it('renders children', () => {
    render(
      <Modal isOpen>
        <ModalContent>Content</ModalContent>
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has role="dialog"', () => {
    render(
      <Modal isOpen>
        <ModalContent>Content</ModalContent>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('ModalHeader', () => {
  it('renders children', () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Header</ModalHeader>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('ModalBody', () => {
  it('renders children', () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalBody>Body</ModalBody>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});

describe('ModalFooter', () => {
  it('renders children', () => {
    render(
      <Modal isOpen>
        <ModalContent>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

