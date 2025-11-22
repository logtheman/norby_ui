import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../test/utils';
import { act } from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../Button';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('does not render tooltip initially', () => {
      render(
        <Tooltip content="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders tooltip content when triggered', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('shows tooltip on hover', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0} closeDelay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      act(() => {
        button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('shows tooltip on focus', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.focus();
        button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('hides tooltip on blur', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0} closeDelay={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.focus();
        button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      act(() => {
        button.blur();
        button.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('does not show tooltip when disabled', async () => {
      render(
        <Tooltip content="Tooltip text" isDisabled delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      // Tooltip should not appear even after delay
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Placement', () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'] as const;

    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, async () => {
        render(
          <Tooltip content="Tooltip" placement={placement} delay={0}>
            <Button>Hover</Button>
          </Tooltip>
        );

        const button = screen.getByRole('button');
        act(() => {
          button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        act(() => {
          vi.advanceTimersByTime(0);
        });
        act(() => {
          vi.advanceTimersByTime(0); // For updatePosition setTimeout
        });

        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, async () => {
        render(
          <Tooltip content="Tooltip" color={color} delay={0}>
            <Button>Hover</Button>
          </Tooltip>
        );

        const button = screen.getByRole('button');
        act(() => {
          button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });
        act(() => {
          vi.advanceTimersByTime(0);
        });
        act(() => {
          vi.advanceTimersByTime(0); // For updatePosition setTimeout
        });

        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(`lui-tooltip--${color}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="tooltip"', async () => {
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );

      const button = screen.getByRole('button');
      act(() => {
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      });
      act(() => {
        vi.advanceTimersByTime(0);
      });
      act(() => {
        vi.advanceTimersByTime(0); // For updatePosition setTimeout
      });

      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
