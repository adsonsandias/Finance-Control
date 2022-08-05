import styled from "styled-components";

export const Container = styled.section`
  flex: 1;
  display: grid;
  grid-template-columns: 5fr 7fr;
  align-items: center;
  /* height: calc(100vh - 8rem); */
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
`;

export const ContentBackground = styled.div`
  background-image: linear-gradient(93.67deg, #ffe664 -8.18%, #fa8341 112.11%);
  box-shadow: 10px 15px 25px rgba(250, 131, 65, 0.25),
    -10px -5px 25px rgba(255, 230, 100, 0.25);
  border-radius: 0px 2.5rem 2.5rem 0px;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0.38rem 0.38rem 0.38rem 0;
  position: relative;
  @media (max-width: 1100px) {
    border-radius: 0px 0px 2rem 2rem;
    padding: 0 0.38rem 0.38rem 0.38rem;
    height: 10rem;
  }
  @media (max-width: 530px) {
    height: 100%;
    min-height: 8rem;
  }

  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    flex: 1;
    z-index: 999;
    @media (max-width: 1100px) {
      flex-direction: row;
    }

    svg {
      margin: 0 auto;
      z-index: 2;
      @media (max-width: 1100px) {
        height: 4rem;
        width: 4.25rem;
        margin: 0;
      }
      @media (max-width: 460px) {
        height: 3rem;
        width: 3.25rem;
      }
    }

    strong {
      color: var(--color-text-1);
      display: flex;
      flex-direction: column;

      span {
        font-weight: 600;
        font-size: 1.63rem;
        color: var(--color-text-1);
        &:nth-child(2n + 0) {
          margin-left: 3.26rem;
        }
        @media (max-width: 1100px) {
          font-size: 1rem;
          &:nth-child(2n + 0) {
            margin-left: 2rem;
          }
        }
      }
    }
  }
`;

export const BgloginStyles = styled.span`
  margin: 0 auto;
  display: flex;
  flex: 1;
  border-radius: 0px 2.5rem 2.5rem 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  mix-blend-mode: soft-light;
  @media (max-width: 1100px) {
    border-radius: 0px 0px 1.8rem 1.8rem;
    background-position: center top 35%;
  }
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 36.19rem;
  margin: 0 auto;
  background: var(--background-white);
  border-radius: 1.56rem;
  justify-content: center;
  align-items: stretch;
  padding: 3rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  box-sizing: border-box;
  box-shadow: 10px 15px 25px rgba(192, 192, 192, 0.25),
    -10px -5px 25px rgba(228, 228, 228, 0.25);
  @media (max-width: 530px) {
    margin: 0 1rem;
    padding: 3rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 8rem;
  }
  @media (max-width: 460px) {
    padding: 2rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h1 {
    padding-bottom: 2rem;
    align-self: flex-start;
    color: var(--color-text-2);
  }

  span {
    text-align: center;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    @media (max-width: 530px) {
      grid-template-columns: 1fr;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      margin-top: 0.5rem;
      color: var(--color-text-3);

      &::after,
      &::before {
        content: "---";
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        color: var(--color-text-3);
      }
    }
  }

  p {
    align-self: flex-start;
    margin-top: 42px;
    font-size: 0.93rem;
    color: var(--color-text-3);

    a {
      list-style: none;
      color: var(--color-text-2);
    }
  }
`;