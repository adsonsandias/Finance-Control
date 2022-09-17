import styled from "styled-components";

export const RecentTransactionItemStyles = styled.div`
  @media (max-width: 1100px) {
    grid-column: span 2;
  }
  @media (max-width: 980px) {
    grid-column: initial;
  }

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;
    color: var(--color-text-2);

    @media (max-width: 780px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      margin-top: 1rem;
      margin-bottom: 1.38rem;
      font-size: 1.25rem;
    }
  }
  & > div + div {
    margin-top: 1rem;
  }
`;

export const MonthTransactionItemStyles = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 1100px) {
    grid-column: span 2;
    justify-content: center;

    & > div,
    & > div svg {
      margin-top: 2rem;
      width: 600px !important;
      height: 400px !important;
    }
  }

  @media (max-width: 780px) {
    margin-bottom: 2rem;
    grid-column: span 2;
    justify-content: center;

    & > div,
    & > div svg {
      margin-top: 2rem;
      width: 400px !important;
      height: 280px !important;
    }
  }
  @media (max-width: 630px) {
    display: none;
  }

  @media (max-width: 980px) {
    grid-column: initial;
    margin-bottom: 4rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
