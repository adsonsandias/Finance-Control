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

  h2 {
    margin-top: 2rem;
    font-size: 1rem;
    color: var(--color-text-2);
    @media (max-width: 480px) {
      font-size: 1.38rem;
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

export const ContainerAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: -1/1;

  p {
    width: 25ch;
    margin-top: 1rem;
    text-align: center;
    bottom: 20%;
  }

  #lottie {
    pointer-events: none !important;
  }

  @media (max-width: 830px) {
    grid-area: initial;
  }

  @media (max-width: 480px) {
    #lottie {
      width: 150px !important;
      height: 150px !important;
    }
  }
`;
