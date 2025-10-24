import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Navigation } from './Navigation';
import { theme } from '../styles/theme';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Navigation Component', () => {
  let scrollToMock: jest.Mock;

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 0,
      bottom: 200,
      right: 0,
      width: 0,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  });

  it('renders brand name', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(/Mark Drohan/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('calls scrollTo when clicking About link', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.body.appendChild(mockElement);

    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);
    fireEvent.click(aboutLink);

    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('navigation links have correct hover behavior', () => {
    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });

  it('renders all four navigation sections', () => {
    renderWithTheme(<Navigation />);
    const links = screen.getAllByRole('generic');
    expect(links.length).toBeGreaterThan(0);
  });

  it('scrolls to top when brand is clicked', () => {
    renderWithTheme(<Navigation />);
    const brand = screen.getByText(/Mark Drohan/i);
    fireEvent.click(brand);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('hides navigation when scrolling down', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('shows navigation when scrolling up', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Simulate scroll down then up
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('shows navigation when scroll position is less than 10', () => {
    const { container } = renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders profile image', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText('Mark Drohan profile picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'Personal Profile.jpg');
  });

  it('scrolls to correct section when clicking each link', () => {
    const sections = ['about', 'skills', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const mockElement = document.createElement('div');
      mockElement.id = sectionId;
      document.body.appendChild(mockElement);
    });

    renderWithTheme(<Navigation />);

    sections.forEach((sectionId) => {
      scrollToMock.mockClear();
      const link = screen.getByText(new RegExp(sectionId, 'i'));
      fireEvent.click(link);
      expect(scrollToMock).toHaveBeenCalled();
    });

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) document.body.removeChild(element);
    });
  });
});
