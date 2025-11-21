import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Typography } from '../Typography';

describe('Typography', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Typography>Typography content</Typography>);
      expect(screen.getByText('Typography content')).toBeInTheDocument();
    });

    it('renders as paragraph by default', () => {
      render(<Typography>Test</Typography>);
      const text = screen.getByText('Test');
      expect(text.tagName).toBe('P');
    });

    it('renders as custom element when as prop is provided', () => {
      render(<Typography as="span">Span text</Typography>);
      const text = screen.getByText('Span text');
      expect(text.tagName).toBe('SPAN');
    });

    it('applies default classes', () => {
      render(<Typography>Test</Typography>);
      const text = screen.getByText('Test');
      expect(text).toHaveClass('lui-typography');
      expect(text).toHaveClass('lui-typography--bodyRegular');
    });
  });

  describe('Variants', () => {
    const variants = [
      'headlineLarge1',
      'headlineMedium1',
      'titleLarge',
      'subtitleLarge',
      'bodyLarge1',
      'bodyMedium1',
      'labelLarge',
      'linkLarge'
    ] as const;
    
    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<Typography variant={variant}>Test</Typography>);
        expect(screen.getByText('Test')).toHaveClass(`lui-typography--${variant}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Typography ref={ref}>Test</Typography>);
      expect(ref).toHaveBeenCalled();
    });
  });
});


