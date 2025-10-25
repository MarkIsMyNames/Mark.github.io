import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  max-width: 1240px;
  margin: 0 auto;
  padding: 6rem 1rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5rem 0.5rem 1rem;
  }
`;
