import { motion } from "framer-motion";
import styled from "styled-components";

export const Context = styled(motion.section)`
  padding: 4rem;
  max-width: 1120px;
  background: white;
  margin: 0 auto;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 480px) {
    padding: 1.63rem 1.25rem;
  }
`;

export const ContainerAnimation = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  align-self: center;
  height: 300px;
  @media (max-width: 480px) {
    justify-content: flex-start;
    height: 200px;
  }

  p {
    width: 25ch;
    margin-top: 1rem;
    text-align: center;
    position: absolute;
    bottom: 2rem;
    @media (max-width: 480px) {
      bottom: 0;
      font-size: 0.88rem;
    }
  }

  #lottie {
    pointer-events: none !important;
    flex: 1;
  }

  @media (max-width: 830px) {
    grid-area: initial;
  }

  @media (max-width: 480px) {
    #lottie {
      width: 200px !important;
      height: 200px !important;
    }
  }
`;

export const UserInfor = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.94rem;
  @media (max-width: 830px) {
    margin-top: 4rem;
  }

  img {
    border-radius: 50%;
    width: 100%;
    max-width: 8.63rem;
    box-shadow: 4px 8px 25px rgba(250, 131, 65, 0.25),
      -5px -2px 25px rgba(255, 230, 100, 0.25);

    @media (max-width: 480px) {
      max-width: 6rem;
      margin-bottom: 1rem;
    }
  }

  h2 {
    margin-bottom: 0.88rem;
    margin-top: 1rem;
    font-size: 1.63rem;
    color: var(--color-text-2);
    @media (max-width: 480px) {
      margin-bottom: 0.5rem;
      font-size: 1.38rem;
    }
  }

  span {
    font-size: 1rem;
    color: var(--color-text-3);
  }
`;
