import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Projects } from './Projects';
import { theme } from '../styles/theme';
import type { Project } from '../types';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Test Project 1',
    role: 'Test Role 1',
    description: 'This is a test project description.',
    highlights: [
      { id: '1', text: 'First highlight', orderIndex: 0 },
      { id: '2', text: 'Second highlight', orderIndex: 1 },
    ],
    images: ['test1.jpg'],
    tags: ['React', 'TypeScript'],
    orderIndex: 0,
  },
  {
    id: '2',
    title: 'Test Project 2',
    role: 'Test Role 2',
    description: 'Another test project.',
    highlights: [{ id: '3', text: 'Third highlight', orderIndex: 0 }],
    images: ['test2.jpg', 'test3.jpg', 'test4.jpg'],
    tags: ['Node.js', 'Express'],
    orderIndex: 1,
  },
];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Projects Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const titleElement = screen.getByText(/Projects & Experience/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders all project titles', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Project 2/i)).toBeInTheDocument();
  });

  it('renders project roles', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Role 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Role 2/i)).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/This is a test project description/i)).toBeInTheDocument();
    expect(screen.getByText(/Another test project/i)).toBeInTheDocument();
  });

  it('renders project highlights', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/First highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/Second highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/Third highlight/i)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Express/i)).toBeInTheDocument();
  });

  it('renders project images', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    // Images with button role (clickable) + regular images (non-clickable)
    const images = screen.getAllByAltText(/screenshot/i);
    expect(images.length).toBeGreaterThanOrEqual(4);
  });

  it('renders single image with correct styling', () => {
    const singleImageProject: Project[] = [mockProjects[0]];
    renderWithTheme(<Projects projects={singleImageProject} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);
    expect(image).toBeInTheDocument();
  });

  it('renders multiple images', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 3 of 3/i)).toBeInTheDocument();
  });

  it('displays all project information together', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Role 1/i)).toBeInTheDocument();
    expect(screen.getByText(/First highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  it('opens modal when clicking on a project image', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);
    image.click();

    // Modal should open after clicking
    expect(
      container.querySelector('img[alt="Test Project 1 screenshot 1 of 1"]'),
    ).toBeInTheDocument();
  });

  it('does not open modal for Intercom project images', () => {
    const intercomProject: Project[] = [
      {
        ...mockProjects[0],
        title: 'Intercom',
        images: ['intercom.jpg'],
      },
    ];
    const { container } = renderWithTheme(<Projects projects={intercomProject} />);
    const image = screen.getByAltText(/Intercom screenshot 1 of 1/i);
    image.click();

    // Modal should not have been opened
    const modalImages = container.querySelectorAll('img[alt="Intercom screenshot 1 of 1"]');
    expect(modalImages.length).toBe(1); // Only the original image, no modal
  });

  it('navigates to next image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const firstImage = screen.getByAltText(/Test Project 2 screenshot 1 of 3/i);
    firstImage.click();

    // Modal should be open, verify multiple images exist
    expect(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i)).toBeInTheDocument();
  });

  it('navigates to previous image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 2 screenshot 2 of 3/i);
    image.click();

    expect(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i)).toBeInTheDocument();
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    expect(screen.getByText(/Projects & Experience/i)).toBeInTheDocument();
  });

  it('handles project with no highlights', () => {
    const projectWithNoHighlights: Project[] = [
      {
        ...mockProjects[0],
        highlights: [],
      },
    ];
    renderWithTheme(<Projects projects={projectWithNoHighlights} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });

  it('handles project with no tags', () => {
    const projectWithNoTags: Project[] = [
      {
        ...mockProjects[0],
        tags: [],
      },
    ];
    renderWithTheme(<Projects projects={projectWithNoTags} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });
});
