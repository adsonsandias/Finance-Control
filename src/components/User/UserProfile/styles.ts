import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.section)`
  padding: 4rem;
  max-width: 1120px;
  background: white;
  margin: 0 auto;
  flex: 1;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  margin-top: -8rem;
  margin-bottom: 7rem;
  box-shadow: 10px 15px 25px rgba(192, 192, 192, 0.25),
    -10px -5px 25px rgba(228, 228, 228, 0.25);
  border-radius: 1.56rem;

  @media (max-width: 1180px) {
    width: initial;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  @media (max-width: 830px) {
    width: initial;
    padding: 0rem;
    grid-template-columns: 1fr;
    background: transparent;
    box-shadow: initial;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const UserInfor = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.94rem;
  @media (max-width: 830px) {
    background: #ffffff;
    margin-bottom: 1rem;
    padding: 2rem 1rem;
    justify-content: center;
  }

  h1 {
    width: 20ch;
    text-align: center;
    align-items: center;
    font-size: 1.63rem;
    font-weight: 500;
    margin-bottom: 4rem;
    color: var(--color-text-2);
    @media (max-width: 830px) {
      display: none;
    }
  }

  div {
    width: 8.63rem;
    height: 8.63rem;
    margin-bottom: 2rem;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
    box-shadow: 4px 8px 25px rgba(250, 131, 65, 0.25),
      -5px -2px 25px rgba(255, 230, 100, 0.25);
    @media (max-width: 480px) {
      width: 6rem;
      height: 6rem;
      margin-bottom: 1rem;
    }
  }

  h2 {
    margin-bottom: 1rem;
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

export const Config = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    align-items: center;
    font-size: 1.63rem;
    font-weight: 500;
    margin-bottom: 2rem;
    color: var(--color-text-2);
    @media (max-width: 830px) {
      display: none;
    }
  }

  ul {
    list-style: none;

    li a {
      display: grid;
      grid-template-columns: auto 1fr auto;
      background: #f4f4f4;
      padding: 1rem 2rem;
      border-radius: 0.94rem;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      @media (max-width: 830px) {
        background: #ffffff;
      }

      svg:first-child {
        grid-area: span 2;
        margin-right: 2rem;
      }

      svg:last-child {
        grid-area: span 2;
      }

      h2 {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-2);
      }

      p {
        font-size: 0.88rem;
        color: var(--color-text-3);
        grid-area: 2/2;
      }
    }
    li + li {
      margin-top: 1rem;
    }
  }

  button {
    display: flex;
    background: #f4f4f4;
    padding: 1.66rem 2rem;
    border-radius: 0.94rem;
    justify-content: center;
    align-items: center;
    border: none;
    margin-top: 1rem;
    @media (max-width: 830px) {
      background: #ffffff;
    }

    svg {
      margin-right: 1rem;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-2);
    }
  }
`;
