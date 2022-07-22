import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--color-text-3);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    tr {
      border-radius: 0.95rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--background-white);
      color: var(--color-text-3);

      &:first-child {
        color: var(--color-text-2);
        border-top-left-radius: 0.95rem;
        border-bottom-left-radius: 0.95rem;
      }
      &:last-child {
        border-top-right-radius: 0.95rem;
        border-bottom-right-radius: 0.95rem;
      }
      &.deposit {
        color: var(--success);
      }
      &.withdraw {
        color: var(--withdraw);
      }
    }
  }
`;
