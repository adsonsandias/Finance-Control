import styled from "styled-components";

export const BitcoinQuoteStyles = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;
    color: var(--color-text-2);

    @media (max-width: 780px) {
      display: none;
    }
  }

  & > div {
    display: flex;

    & > div + div {
      margin-left: 1.5rem;
    }
  }
`;

export const WalletStyles = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;

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
  }
`;
