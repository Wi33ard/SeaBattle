import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/SEA BATTLE/i);
  expect(linkElement).toBeInTheDocument();
});
