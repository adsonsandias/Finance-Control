import styled from "styled-components";

export const BitcoinQuoteStyles = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 630px) {
    overflow: auto;
  }

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;
    color: var(--color-text-2);
    position: absolute;
    left: 2rem;

    @media (max-width: 480px) {
      font-size: 1.25rem;
      left: 0;
      margin-bottom: 1rem;
    }
  }

  & > div {
    display: flex;
    @media (max-width: 980px) {
      align-self: center;
    }
    @media (max-width: 630px) {
      align-self: flex-start;
      margin-top: 4rem;
      margin-bottom: 1rem;
    }

    & > div + div {
      margin-left: 1.5rem;

      @media (max-width: 480px) {
        margin-left: 0.88rem;
      }
    }
  }
`;

export const WalletStyles = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 980px) {
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  @media (max-width: 630px) {
    display: none;
  }

  @media (max-width: 480px) {
    display: none;
  }

  span {
    transform: rotate(-90deg);
    position: absolute;
    font-weight: 700;
    font-size: 1.63rem;
    line-height: 2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #d9dde4;
    left: 0;

    @media (max-width: 1100px) {
      display: none;
    }

    @media (max-width: 980px) {
      display: initial;
      position: initial;
      transform: initial;
      letter-spacing: initial;
      align-self: flex-start;
      font-weight: 500;
      font-size: 1.63rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
      text-transform: initial;
      color: var(--color-text-2);
    }
  }
`;
