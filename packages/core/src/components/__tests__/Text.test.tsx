import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { Text, H1, H2, H3, H4, H5 } from '../Text';

describe('Text', () => {
  describe('Rendering', () => {
    it('renders as paragraph by default', () => {
      render(<Text>Text content</Text>);
      const text = screen.getByText('Text content');
      expect(text.tagName).toBe('P');
    });

    it('renders children correctly', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      render(<Text as="span">Span text</Text>);
      const text = screen.getByText('Span text');
      expect(text.tagName).toBe('SPAN');
    });

    it('applies default classes', () => {
      render(<Text>Test</Text>);
      const text = screen.getByText('Test');
      expect(text).toHaveClass('lui-text');
      expect(text).toHaveClass('lui-text--color-default');
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<Text size={size}>Test</Text>);
        expect(screen.getByText('Test')).toHaveClass(`lui-text--${size}`);
      });
    });
  });

  describe('Colors', () => {
    const colors = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'muted',
      'subtle'
    ] as const;

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        render(<Text color={color}>Test</Text>);
        expect(screen.getByText('Test')).toHaveClass(`lui-text--color-${color}`);
      });
    });
  });

  describe('Weights', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

    weights.forEach((weight) => {
      it(`renders with ${weight} weight`, () => {
        render(<Text weight={weight}>Test</Text>);
        expect(screen.getByText('Test')).toHaveClass(`lui-text--weight-${weight}`);
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Text ref={ref}>Test</Text>);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('H1', () => {
  it('renders as h1 element', () => {
    render(<H1>Heading 1</H1>);
    const heading = screen.getByText('Heading 1');
    expect(heading.tagName).toBe('H1');
  });

  it('applies text classes', () => {
    render(<H1>Test</H1>);
    expect(screen.getByText('Test')).toHaveClass('lui-text');
  });
});

describe('H2', () => {
  it('renders as h2 element', () => {
    render(<H2>Heading 2</H2>);
    const heading = screen.getByText('Heading 2');
    expect(heading.tagName).toBe('H2');
  });
});

describe('H3', () => {
  it('renders as h3 element', () => {
    render(<H3>Heading 3</H3>);
    const heading = screen.getByText('Heading 3');
    expect(heading.tagName).toBe('H3');
  });
});

describe('H4', () => {
  it('renders as h4 element', () => {
    render(<H4>Heading 4</H4>);
    const heading = screen.getByText('Heading 4');
    expect(heading.tagName).toBe('H4');
  });
});

describe('H5', () => {
  it('renders as h5 element', () => {
    render(<H5>Heading 5</H5>);
    const heading = screen.getByText('Heading 5');
    expect(heading.tagName).toBe('H5');
  });
});
