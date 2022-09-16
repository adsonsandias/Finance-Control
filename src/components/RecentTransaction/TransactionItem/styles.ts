import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--background);
  padding: 1.38rem;
  border-radius: 0.94rem;
  border: 1px solid #d7d7d7;

  div:first-child {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 1fr;

    svg {
      grid-row: 1 / -3;
      margin-right: 1rem;
    }

    strong {
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--color-text-2);
      margin-bottom: 0.25rem;
    }

    span {
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 0.94rem;
      color: var(--color-text-3);
    }
  }

  div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;

    span:first-child {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--color-text-2);
      margin-left: 1rem;

      &::before {
        content: "";
        width: 0.31rem;
        height: 0.31rem;
        display: block;
        border-radius: 50%;
        margin-right: 0.5rem;
        background: linear-gradient(93.67deg, #64d0ff -8.18%, #4174fa 112.11%);
      }
    }

    span:last-child {
      text-align: end;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--success);
    }
  }
`;
