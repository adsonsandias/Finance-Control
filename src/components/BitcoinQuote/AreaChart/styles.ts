import styled from "styled-components";

export const AreaChartStyles = styled.div`
  background: linear-gradient(93.67deg, #ffe664 -8.18%, #fa8341 112.11%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 25px;
  padding: 0.13rem;

  & > div {
    background-color: #fff;
    border-radius: 24px;
    padding: 0.88rem;

    & > div {
      display: flex;

      img {
        margin-right: 8px;
      }

      & > div {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        line-height: 17px;
        align-items: flex-start;

        span:first-child {
          font-size: 14px;
          color: #363f5f;
        }

        span:last-child {
          text-transform: uppercase;
          font-size: 12px;
          color: #969cb3;
        }
      }
    }

    strong {
      text-align: center;
      color: #33cc95;
    }
  }
`;
