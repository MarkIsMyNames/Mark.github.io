import React, { useState, useEffect } from 'react';
import {
  Nav,
  NavContainer,
  NavBrandContainer,
  NavProfileImage,
  NavBrand,
  NavLinks,
  NavLink,
} from './Navigation.styles';

export const Navigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    const nav = document.querySelector('nav');
    const navHeight = nav?.offsetHeight || 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav $isVisible={isVisible} role="navigation" aria-label="Main navigation">
      <NavContainer>
        <NavBrandContainer onClick={scrollToTop} role="button" aria-label="Scroll to top">
          <NavProfileImage src="Personal Profile.jpg" alt="Mark Drohan profile picture" />
          <NavBrand>Mark Drohan</NavBrand>
        </NavBrandContainer>
        <NavLinks role="menu">
          <NavLink
            onClick={() => scrollToSection('about')}
            role="menuitem"
            aria-label="Navigate to About section"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('skills')}
            role="menuitem"
            aria-label="Navigate to Skills section"
          >
            Skills
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('projects')}
            role="menuitem"
            aria-label="Navigate to Projects section"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('contact')}
            role="menuitem"
            aria-label="Navigate to Contact section"
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};
