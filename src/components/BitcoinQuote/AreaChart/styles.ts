import styled from "styled-components";

export const AreaChartStyles = styled.div`
  background: linear-gradient(93.67deg, #ffe664 -8.18%, #fa8341 112.11%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 25px;
  padding: 0.13rem;
  @media (max-width: 480px) {
    padding: 0rem;
  }

  & > div {
    background-color: #fff;
    border-radius: 24px;
    padding: 0.88rem;
    @media (max-width: 480px) {
      padding: 0.75rem;
      border-radius: 15px;
    }

    & > div {
      display: flex;

      img {
        margin-right: 0.5rem;

        @media (max-width: 480px) {
          max-width: 1.13rem;
          max-height: 1.13rem;
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        line-height: 1.06rem;
        align-items: flex-start;

        span:first-child {
          font-size: 0.88rem;
          color: var(--color-text-2);

          @media (max-width: 480px) {
            font-size: 0.63rem;
            line-height: initial;
          }
        }

        span:last-child {
          text-transform: uppercase;
          font-size: 0.75rem;
          color: var(--color-text-3);

          @media (max-width: 480px) {
            font-size: 0.5rem;
            line-height: initial;
          }
        }
      }
    }

    & > div:nth-child(2),
    & > div:nth-child(2) svg {
      @media (max-width: 480px) {
        margin-top: 0.13rem;
        width: 76px !important;
        height: 34px !important;
      }
    }
    strong {
      text-align: center;
      color: var(--success);

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }
`;
