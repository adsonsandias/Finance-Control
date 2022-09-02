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
    padding: 0rem;
    grid-template-columns: 1fr;
    background: transparent;
    box-shadow: initial;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

// CartVirtual
export const CartVirtual = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 4rem;

  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 2rem;

    @media (max-width: 830px) {
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
  }
`;

interface ICARDCONTENTPROPS {
  isActive: boolean;
}

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
  h1 {
    font-weight: 500;
    font-size: 1.63rem;
    margin-bottom: 1.25rem;

    @media (max-width: 830px) {
      display: none;
    }
  }

  ul {
    list-style: none;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 1rem 2rem;
  }
`;

Spending.defaultProps = {
  theme: {
    icon: "var(--gradient-green)",
  },
};

export const SpendingItem = styled(motion.li)<ICARDCONTENTPROPS>`
  background: var(--gradient-first);
  padding: 0.63rem;
  width: 16rem;
  /* width: ${(props) => (props.isActive ? "16rem" : "3.63rem")}; */
  height: 6.25rem;
  border-radius: 1.75rem;
  display: flex;
  /* transition: width 0.3s; */

  & > div {
    display: flex;
    /* grid-template-columns: auto 1fr; */
    align-items: center;
    flex: 1;
    background-color: #f0f2f5;
    border-radius: 1.13rem;
    box-shadow: 0 0 0 0.5rem #ffffff;
    position: relative;

    & > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${(props) => props.theme.icon};
      padding: 0.75rem;
      margin-left: 1rem;
      border-radius: 50%;
    }

    & > div:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 1rem;
      flex: 1;

      strong {
        color: var(--color-text-2);
        width: 100%;
        text-align: end;
        font-size: 1.38rem;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        bottom: 0.5rem;
      }

      span {
        color: var(--color-text-3);
        text-transform: uppercase;
        font-size: 0.75rem;
        margin-top: 0.38rem;
        position: absolute;
        bottom: 1rem;
      }
    }
  }
`;
