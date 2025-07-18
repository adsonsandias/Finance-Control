import styled from "styled-components";

export const RecentTransactionItemStyles = styled.div`
  overflow: auto;
  height: 400px;
  padding-right: 1rem;

  @media (max-width: 1100px) {
    grid-column: span 2;
  }
  @media (max-width: 980px) {
    grid-column: initial;
  }
  @media (max-width: 630px) {
    min-height: 600px;
    height: 1000px;
    overflow: auto;
  }
  @media (max-width: 480px) {
    min-height: 600px;
    height: 1000px;
    overflow: auto;
  }

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    color: var(--color-text-2);
    position: sticky;
    top: 0;
    background: linear-gradient(
      180deg,
      #ffffff 69.77%,
      rgba(255, 255, 255, 0) 96.51%
    );
    padding-bottom: 2rem;
    z-index: 3;

    @media (max-width: 780px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      background: linear-gradient(
        180deg,
        var(--background) 69.77%,
        rgba(255, 255, 255, 0) 96.51%
      );
      padding-top: 1rem;
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
