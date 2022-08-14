import styled from "styled-components";

export const Context = styled.div`
  padding: 4rem;
  max-width: 1120px;
  background: white;
  margin: 0 auto;
  flex: 1;
  display: grid;
  width: 100%;
  margin-top: -8rem;
  margin-bottom: 7rem;
  border-radius: 1.56rem;
  position: relative;

  header {
    position: absolute;
    grid-area: -1/1;
  }

  nav {
    ul {
      list-style: none;

      li {
        a {
          display: flex;
          align-items: center;
          text-decoration: none;

          svg {
            transform: rotate(180deg);
          }

          span {
            margin-left: 1rem;
            font-size: 1.63rem;
            color: var(--color-text-2);
            @media (max-width: 480px) {
              font-size: 1.38rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1180px) {
    width: initial;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  @media (max-width: 830px) {
    width: initial;
    padding: 2rem;
    grid-template-columns: 1fr;
    box-shadow: initial;
    border-radius: 0.94rem;
  }
`;

export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 830px) {
    margin-top: 4rem;
    grid-template-columns: 1fr;
  }
  @media (max-width: 480px) {
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 830px) {
      margin-bottom: 3rem;
    }

    h1 {
      background: linear-gradient(93.67deg, #ffe664 -8.18%, #fa8341 112.11%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 4rem;
      font-weight: 700;

      @media (max-width: 880px) {
        font-size: 3rem;
      }

      @media (max-width: 359px) {
        font-size: 1.75rem;
      }
    }

    span {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-3);

      @media (max-width: 880px) {
        font-size: 1rem;
      }

      @media (max-width: 359px) {
        font-size: 0.63rem;
      }
    }
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AccordionListStyle = styled.div`
  div + div {
    margin-top: 0.5rem;
  }
`;
