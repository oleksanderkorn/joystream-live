import React from 'react';
import { render, screen } from '@testing-library/react';
import JoystreamApp from './App';

test('renders learn react link', () => {
  render(<JoystreamApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
