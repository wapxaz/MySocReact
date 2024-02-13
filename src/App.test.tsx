import { render, screen } from '@testing-library/react';
import AppMain from './App.tsx';
import { unmountComponentAtNode } from 'react-dom';
import React from 'react';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<AppMain />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
