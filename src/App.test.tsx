import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders name', () => {
    render(<App />);
    const nameElements = screen.getAllByText(/Mark Drohan/i);
    expect(nameElements.length).toBeGreaterThan(0);
    expect(nameElements[0]).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<App />);
    const titleElements = screen.getAllByText(/Software Engineer/i);
    expect(titleElements.length).toBeGreaterThan(0);
    expect(titleElements[0]).toBeInTheDocument();
  });
});
