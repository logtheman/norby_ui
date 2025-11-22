import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

/**
 * Custom render function that wraps components with any necessary providers
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => {
  return render(ui, {
    ...options
  });
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
