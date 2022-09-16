import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--background);
  padding: 1.38rem;
  border-radius: 0.94rem;
  border: 1px solid #d7d7d7;
  @media (max-width: 630px) {
    grid-template-columns: 1fr;
    position: relative;
    grid-auto-flow: dense;
  }
  @media (max-width: 480px) {
    background-color: var(--background-white);
    border: none;
    grid-template-columns: 1fr;
    position: relative;
    grid-auto-flow: dense;
  }

  div:first-child {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 1fr;
    @media (max-width: 630px) {
      justify-items: end;
    }
    @media (max-width: 480px) {
      justify-items: end;
    }

    svg {
      grid-row: 1 / -3;
      margin-right: 1rem;

      @media (max-width: 630px) {
        grid-row: initial;
        margin-right: initial;
      }
      @media (max-width: 480px) {
        grid-row: initial;
        margin-right: initial;

        width: 1.25rem;
        height: 1.25rem;
      }
    }

    strong {
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--color-text-2);
      margin-bottom: 0.25rem;

      @media (max-width: 630px) {
        grid-row: 1;
      }
      @media (max-width: 480px) {
        grid-row: 1;
        font-weight: 400;
        font-size: 0.88rem;
        line-height: 1.06rem;
      }
    }

    span {
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 0.94rem;
      color: var(--color-text-3);

      @media (max-width: 630px) {
        position: absolute;
        font-size: 1rem;
        right: 1.38rem;
        bottom: 1.5rem;
      }
      @media (max-width: 480px) {
        position: absolute;
        font-size: 0.75rem;
        right: 1.38rem;
        bottom: 1.5rem;
      }
    }
  }

  div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 630px) {
      grid-template-columns: 1fr;
      grid-auto-flow: dense;
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      grid-auto-flow: dense;
    }

    span:first-child {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--color-text-2);
      margin-left: 1rem;
      @media (max-width: 630px) {
        color: var(--color-text-3);
        text-align: end;
        margin-left: initial;
      }
      @media (max-width: 480px) {
        color: var(--color-text-3);
        font-size: 0.88rem;
        text-align: end;
        margin-left: initial;
      }

      &::before {
        content: "";
        width: 0.31rem;
        height: 0.31rem;
        display: block;
        border-radius: 50%;
        margin-right: 0.5rem;
        background: linear-gradient(93.67deg, #64d0ff -8.18%, #4174fa 112.11%);

        @media (max-width: 630px) {
          display: none;
          margin-right: initials;
        }
        @media (max-width: 480px) {
          display: none;
          margin-right: initials;
        }
      }
    }

    span:last-child {
      text-align: end;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.25rem;
      color: var(--success);

      @media (max-width: 630px) {
        grid-row: 1;
        text-align: start;
        font-size: 1.25rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }
      @media (max-width: 480px) {
        grid-row: 1;
        text-align: start;
        font-size: 1.25rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }
    }
  }
`;
