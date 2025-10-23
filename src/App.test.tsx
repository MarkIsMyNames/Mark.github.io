import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to My Personal Website/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders description text', () => {
  render(<App />);
  const descriptionElement = screen.getByText(
    /showcase of my accomplishments, skills, and experience/i,
  );
  expect(descriptionElement).toBeInTheDocument();
});
