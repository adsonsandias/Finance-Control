import styled from "styled-components";

export const RecentTransactionItemStyles = styled.div`
  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;
    color: var(--color-text-2);

    @media (max-width: 780px) {
      display: 1.5rem;
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
`;
