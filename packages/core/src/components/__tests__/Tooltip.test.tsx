import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../test/utils';
import userEvent from '@testing-library/user-event';
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
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      }, { timeout: 1000 });
    });
  });

  describe('Interactions', () => {
    it('shows tooltip on hover', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('hides tooltip on mouse leave', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0} closeDelay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      }, { timeout: 1000 });
      
      await user.unhover(button);
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('shows tooltip on focus', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.tab();
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('hides tooltip on blur', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0} closeDelay={0}>
          <Button>Focus me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.tab();
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      }, { timeout: 1000 });
      
      await user.tab();
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      }, { timeout: 1000 });
    });
  });

  describe('States', () => {
    it('does not show tooltip when disabled', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" isDisabled delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      const button = screen.getByRole('button');
      await user.hover(button);
      vi.advanceTimersByTime(100);
      
      // Tooltip should not appear even after delay
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Placement', () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'] as const;
    
    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, async () => {
        const user = userEvent.setup({ delay: null });
        render(
          <Tooltip content="Tooltip" placement={placement} delay={0}>
            <Button>Hover</Button>
          </Tooltip>
        );
        
        await user.hover(screen.getByRole('button'));
        vi.advanceTimersByTime(0);
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip');
          expect(tooltip).toBeInTheDocument();
        }, { timeout: 1000 });
      });
    });
  });

  describe('Colors', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    colors.forEach((color) => {
      it(`renders with ${color} color`, async () => {
        const user = userEvent.setup({ delay: null });
        render(
          <Tooltip content="Tooltip" color={color} delay={0}>
            <Button>Hover</Button>
          </Tooltip>
        );
        
        await user.hover(screen.getByRole('button'));
        vi.advanceTimersByTime(0);
        
        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip');
          expect(tooltip).toHaveClass(`lui-tooltip--${color}`);
        }, { timeout: 1000 });
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="tooltip"', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <Tooltip content="Tooltip text" delay={0}>
          <Button>Hover me</Button>
        </Tooltip>
      );
      
      await user.hover(screen.getByRole('button'));
      vi.advanceTimersByTime(0);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      }, { timeout: 1000 });
    });
  });
});

