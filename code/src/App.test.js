import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

test('renders GitFit title on dashboard', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /GitFit/i, level: 1 })).toBeInTheDocument();
});
