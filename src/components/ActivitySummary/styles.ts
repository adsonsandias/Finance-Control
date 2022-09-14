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
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-top: -8rem;
  margin-bottom: 1.75rem;
  border-radius: 1.56rem;
  box-shadow: 10px 15px 25px rgba(192, 192, 192, 0.25),
    -10px -5px 25px rgba(228, 228, 228, 0.25);

  @media (max-width: 1180px) {
    width: initial;
  }
  @media (max-width: 830px) {
    width: initial;
    padding: 2rem;
  }

  @media (max-width: 780px) {
    width: initial;
    padding: 0rem;
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    width: initial;
    padding: 0rem;
    background: transparent;
    box-shadow: initial;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;

// CartVirtual
export const CartVirtual = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 4rem;
  @media (max-width: 780px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-right: 0rem;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 480px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;

    @media (max-width: 780px) {
      display: none;
    }
  }

  &::after {
    content: "";
    width: 2px;
    height: 100%;
    background: #ebecee;
    position: absolute;
    top: 0;
    right: -2.5rem;

    @media (max-width: 780px) {
      display: none;
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  width: 20.44rem;
  height: 12.5rem;
  background: #ffffff;
  border-radius: 1.56rem;
  background-image: var(--gradient-first);
  padding: 0.25rem;
  box-shadow: 4px 8px 25px rgba(250, 131, 65, 0.25),
    -5px -2px 25px rgba(255, 230, 100, 0.25);

  @media (max-width: 480px) {
    width: 100%;
  }

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--background-white);
    border-radius: 1.4rem;
    padding: 1.5rem;

    & > span {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-2);
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 0.88rem;
    text-transform: uppercase;
    color: var(--color-text-3);
  }
`;

export const CardInfor = styled.div`
  display: flex;

  div:first-child {
    margin-right: 1.25rem;
  }

  div {
    display: flex;
    flex-direction: column;

    span {
      margin-top: 0.5rem;
    }

    span:first-child {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-3);
    }

    span:last-child {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-2);
    }
  }
`;

// Gastos
export const Spending = styled.div`
  overflow: auto;
  position: relative;
  @media (max-width: 780px) {
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (max-width: 480px) {
    padding-bottom: 0rem;
    padding-left: 0rem;
    padding-right: 0rem;
  }

  h1 {
    font-weight: 500;
    color: var(--color-text-2);
    font-size: 1.63rem;

    @media (max-width: 780px) {
      display: none;
    }
  }

  & > div {
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      margin-top: 0.38rem;
    }
  }

  ul {
    list-style: none;
    display: grid;
    justify-content: start;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 1100px) {
      grid-template-columns: repeat(4, minmax(auto, 16rem));
    }

    @media (max-width: 780px) {
      justify-items: center;
    }

    @media (max-width: 480px) {
      justify-items: start;
    }
  }
`;

export const TitleMobile = styled.h1`
  display: none;
  @media (max-width: 780px) {
    display: block;
    font-weight: 500;
    color: var(--color-text-2);
    font-size: 1.63rem;
    text-align: center;
  }
  @media (max-width: 480px) {
    text-align: left;
    font-size: 1.25rem;
  }
`;

Spending.defaultProps = {
  theme: {
    icon: "var(--gradient-green)",
  },
};
